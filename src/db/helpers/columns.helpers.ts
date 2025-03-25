import { timestamp } from 'drizzle-orm/pg-core';

export const nowUTC = () => new Date(Date.now());

export const timestamps = {
  created_at: timestamp({ withTimezone: true, mode: 'date' }).defaultNow().notNull(),
  updated_at: timestamp({ withTimezone: true, mode: 'date' })
    .defaultNow()
    .notNull()
    .$onUpdate(() => nowUTC()),
  deleted_at: timestamp({ withTimezone: true, mode: 'date' }),
};
