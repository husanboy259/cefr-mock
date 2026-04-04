import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3000),
  SUPABASE_URL: z.string().min(1),
  SUPABASE_KEY: z.string().min(1),
  JWT_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('30d'),
  CLIENT_URL: z.string().default('http://localhost:5173'),
  UPLOAD_DIR: z.string().default('./uploads'),
  MAX_FILE_SIZE_MB: z.coerce.number().default(50),
  TELEGRAM_BOT_TOKEN: z.string().default(''),
});

export const env = envSchema.parse(process.env);
