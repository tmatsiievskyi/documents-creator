/* eslint-disable @typescript-eslint/no-explicit-any */

import { env } from '@/lib/env';
import { Pool, PoolConfig } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
// import { schema } from './sch';

let database: ReturnType<typeof drizzle<any>>;
let pool: Pool;

const poolConfig: PoolConfig = {
  connectionString: env.DATABASE_URL,
  min: Number(env.DATABASE_POOL_MIN),
  max: Number(env.DATABASE_POOL_MAX),
};

if (env.NODE_ENV === 'production') {
  pool = new Pool(poolConfig);
  database = drizzle({ client: pool });
} else {
  if (!(global as any).database!) {
    (global as any).pool = new Pool(poolConfig);
    (global as any).database = drizzle({ client: (global as any).pool });
  }
  pool = (global as any).pool;
  database = (global as any).database;
}

export { database, pool };
