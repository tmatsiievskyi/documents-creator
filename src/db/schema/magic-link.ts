import { index, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const magicLinksTable = pgTable(
  'doc_magic_links',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    email: text('email').notNull().unique(),
    token: text('token').notNull().unique(),
    tokenExpiresAt: timestamp('token_expires_at', { mode: 'date' }),
  },
  table => [index('magic_links_token_idx').on(table.token)]
);
