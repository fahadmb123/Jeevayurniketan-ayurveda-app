import { createClient } from '@libsql/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
  throw new Error('[Database] Missing DATABASE_URL in environment configuration.');
}

// 1. Initialize Prisma libSQL driver adapter with Turso credentials
const adapter = new PrismaLibSql({
  url,
  authToken: authToken || undefined,
});

// 2. Initialize Prisma Client with driver adapter
export const prisma = new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
});

/**
 * Verifies live connection to Turso database
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
