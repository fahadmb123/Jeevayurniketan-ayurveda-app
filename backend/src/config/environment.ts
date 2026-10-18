import dotenv from 'dotenv';

dotenv.config();

export interface EnvironmentConfig {
  port: number;
  nodeEnv: 'development' | 'production' | 'test';
  corsOrigin: string;
}

const parsePort = (value: string | undefined, defaultPort: number): number => {
  if (!value) return defaultPort;
  const parsed = parseInt(value, 10);
  if (isNaN(parsed) || parsed <= 0 || parsed > 65535) {
    console.warn(`[Config] Invalid PORT "${value}" supplied. Falling back to default ${defaultPort}.`);
    return defaultPort;
  }
  return parsed;
};

const parseNodeEnv = (value: string | undefined): 'development' | 'production' | 'test' => {
  if (value === 'production' || value === 'test') {
    return value;
  }
  return 'development';
};

export const env: EnvironmentConfig = {
  port: parsePort(process.env.PORT, 7000),
  nodeEnv: parseNodeEnv(process.env.NODE_ENV),
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
};
