import { z } from 'zod';

const envSchema = z.object({
  POSTGRES_USER: z.string().min(1),
  POSTGRES_PASSWORD: z.string().min(1),
  POSTGRES_HOST: z.string().min(1),
  POSTGRES_PORT: z.string().min(1),
  POSTGRES_DB: z.string().min(1),
  DATABASE_URL: z.string().min(1),
  NODE_ENV: z.string().min(1),
  DATABASE_POOL_MIN: z.string().min(1),
  DATABASE_POOL_MAX: z.string().min(1),
});

const validateEnv = () => {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error('Invalid environment variables:', parsed.error.flatten().fieldErrors);
    throw new Error('Invalid environment variables');
  }
};

export const initEnv = () => {
  console.log(process.env.NODE_ENV);

  validateEnv();

  return {
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_PORT: process.env.POSTGRES_PORT,
    POSTGRES_DB: process.env.POSTGRES_DB,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_POOL_MIN: process.env.DATABASE_POOL_MIN,
    DATABASE_POOL_MAX: process.env.DATABASE_POOL_MAX,
  };
};

export const env = initEnv();
