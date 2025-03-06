import 'dotenv/config';

import { database, pool } from './index';
import { sql } from 'drizzle-orm';

async function main() {
  await database.execute(sql.raw(`DROP SCHEMA IF EXISTS "drizzle" CASCADE;`));

  await database.execute(sql.raw(`DROP SCHEMA public CASCADE;`));
  await database.execute(sql.raw(`CREATE SCHEMA public;`));
  await database.execute(sql.raw(`GRANT ALL ON SCHEMA public TO "tarasPG";`));
  await database.execute(sql.raw(`GRANT ALL ON SCHEMA public TO public;`));
  await database.execute(sql.raw(`COMMENT ON SCHEMA public IS 'standard public schema';`));

  await pool.end();
}

main();
