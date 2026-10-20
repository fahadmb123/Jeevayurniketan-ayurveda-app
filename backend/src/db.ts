import { createClient } from '@libsql/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const connectionUrl = process.env.DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!connectionUrl) {
  throw new Error('[Database] Missing DATABASE_URL in environment configuration.');
}

const config = {
  url: connectionUrl,
  authToken: authToken || undefined,
};

// Initialize Turso createClient
export const libsql = createClient(config);

// Initialize official @prisma/adapter-libsql adapter
const adapter = new PrismaLibSQL(config);

// Instantiate and export a single production-ready PrismaClient instance
export const prisma = new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
});

/**
 * Helper to verify live connection to the Turso database
 */
export async function verifyDatabaseConnection(): Promise<boolean> {
  try {
    const userCount = await prisma.user.count();
    console.log(`✅ Connected to Turso libSQL database via Prisma ORM (Total users: ${userCount}).`);
    return true;
  } catch (error) {
    console.error('❌ Failed to connect to Turso database:', error);
    return false;
  }
}

export default prisma;
