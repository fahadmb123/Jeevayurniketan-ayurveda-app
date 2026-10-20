import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@libsql/client';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = process.env.DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
  console.error('❌ Missing DATABASE_URL in environment variables.');
  process.exit(1);
}

const client = createClient({
  url,
  authToken: authToken || undefined,
});

async function runCloudMigrations(): Promise<void> {
  console.log('🔄 Checking Turso cloud database migrations...');

  // Ensure migrations tracking table exists
  await client.execute(`
    CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
      "id" TEXT PRIMARY KEY,
      "migration_name" TEXT NOT NULL,
      "finished_at" DATETIME,
      "started_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Fetch already applied migrations
  const result = await client.execute(
    'SELECT migration_name FROM "_prisma_migrations" WHERE finished_at IS NOT NULL;'
  );
  const applied = new Set(result.rows.map((row) => String(row.migration_name)));

  const migrationsDir = path.resolve(__dirname, '../prisma/migrations');
  if (!fs.existsSync(migrationsDir)) {
    console.log('⚠️ No prisma/migrations directory found.');
    return;
  }

  const entries = fs
    .readdirSync(migrationsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  let appliedCount = 0;

  for (const migrationName of entries) {
    if (applied.has(migrationName)) {
      continue;
    }

    const sqlPath = path.join(migrationsDir, migrationName, 'migration.sql');
    if (!fs.existsSync(sqlPath)) {
      continue;
    }

    const sqlContent = fs.readFileSync(sqlPath, 'utf8');
    console.log(`🚀 Applying migration to Turso: ${migrationName}...`);

    try {
      await client.executeMultiple(sqlContent);
      await client.execute({
        sql: 'INSERT INTO "_prisma_migrations" (id, migration_name, finished_at) VALUES (?, ?, CURRENT_TIMESTAMP);',
        args: [migrationName, migrationName],
      });
      console.log(`✅ Successfully applied: ${migrationName}`);
      appliedCount++;
    } catch (err) {
      console.error(`❌ Migration failed on ${migrationName}:`, err);
      process.exit(1);
    }
  }

  if (appliedCount === 0) {
    console.log('✨ Turso cloud database is already up to date. No pending migrations.');
  } else {
    console.log(`🎉 Successfully applied ${appliedCount} migration(s) to Turso.`);
  }
}

runCloudMigrations().catch((err) => {
  console.error('Migration error:', err);
  process.exit(1);
});
