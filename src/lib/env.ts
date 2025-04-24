import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    APP_NAME: z.string().min(1),
    NODE_ENV: z.string().optional(),
    HOST_NAME: z.string().min(1),

    // --- db
    POSTGRES_USER: z.string().min(1),
    POSTGRES_PASSWORD: z.string().min(1),
    POSTGRES_HOST: z.string().min(1),
    POSTGRES_PORT: z.string().min(1),
    POSTGRES_DB: z.string().min(1),
    DATABASE_URL: z.string().min(1),
    DATABASE_POOL_MIN: z.string().min(1),
    DATABASE_POOL_MAX: z.string().min(1),
    // --- magic_link
    MAGIC_LINK_EXPIRES: z.string().min(1),
    // --- email
    EMAIL_FROM: z.string().min(1),
    EMAIL_SERVER_HOST: z.string().min(1),
    EMAIL_SERVER_PORT: z.string().min(1),
    EMAIL_SERVER_USER: z.string().min(1),
    EMAIL_SERVER_PASSWORD: z.string().min(1),
    // --- cloudflare
    CLOUDFLARE_ACCOUNT_ID: z.string().min(1),
    CLOUDFLARE_ACCESS_KEY_ID: z.string().min(1),
    CLOUDFLARE_SECRET_ACCESS_KEY: z.string().min(1),
    CLOUDFLARE_BUCKET_NAME: z.string().min(1),
    // --- google
    GOOGLE_CLIENT_ID: z.string().nonempty(),
    GOOGLE_CLIENT_SECRET: z.string().nonempty(),
  },
  client: {
    NEXT_PUBLIC_MAGIC_LINK_EXPIRES: z.string().min(1),
    NEXT_PUBLIC_VERIFY_EMAIL_TOKEN: z.string().min(1),
    NEXT_PUBLIC_NODE_ENV: z.string().min(1),
    NEXT_PUBLIC_APP_NAME: z.string().min(1),
    NEXT_PUBLIC_MAX_UPLOAD_IMAGE_SIZE_MB: z.string().min(1),
  },
  runtimeEnv: {
    // --- server
    APP_NAME: process.env.APP_NAME,
    NODE_ENV: process.env.NODE_ENV,
    HOST_NAME: process.env.HOST_NAME,

    // --- db
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_PORT: process.env.POSTGRES_PORT,
    POSTGRES_DB: process.env.POSTGRES_DB,
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_POOL_MIN: process.env.DATABASE_POOL_MIN,
    DATABASE_POOL_MAX: process.env.DATABASE_POOL_MAX,
    // --- magic_link
    MAGIC_LINK_EXPIRES: process.env.NEXT_PUBLIC_MAGIC_LINK_EXPIRES,
    // --- email
    EMAIL_FROM: process.env.EMAIL_FROM,
    EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST,
    EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT,
    EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER,
    EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD,

    // --- cloudflare
    CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID,
    CLOUDFLARE_ACCESS_KEY_ID: process.env.CLOUDFLARE_ACCESS_KEY_ID,
    CLOUDFLARE_SECRET_ACCESS_KEY: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
    CLOUDFLARE_BUCKET_NAME: process.env.CLOUDFLARE_BUCKET_NAME,

    // --- google
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

    // --- client
    NEXT_PUBLIC_MAGIC_LINK_EXPIRES: process.env.NEXT_PUBLIC_MAGIC_LINK_EXPIRES,
    NEXT_PUBLIC_VERIFY_EMAIL_TOKEN: process.env.NEXT_PUBLIC_VERIFY_EMAIL_TOKEN,
    NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_MAX_UPLOAD_IMAGE_SIZE_MB: process.env.NEXT_PUBLIC_MAX_UPLOAD_IMAGE_SIZE_MB,
  },
});
