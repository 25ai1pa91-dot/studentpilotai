import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('8000'),
  MONGO_URI: z.string().default('mongodb://localhost:27017/studentpilot_db'),
  REDIS_URI: z.string().default('redis://localhost:6379'),
  JWT_SECRET: z.string().default('super_secret_jwt_key_studentpilot_2026'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  CORS_ORIGIN: z.string().default('http://localhost:8443'),
  LOG_LEVEL: z.string().default('info'),
});

const parseResult = envSchema.safeParse(process.env);

if (!parseResult.success) {
  console.error('❌ Environment validation failed:', parseResult.error.format());
  process.exit(1);
}

export const env = parseResult.data;
