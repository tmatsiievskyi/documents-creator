import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { usersTable } from './user';
import { relations } from 'drizzle-orm';
import { timestamps } from '../helpers';

export const sessionsTable = pgTable('doc_sessions', {
  id: text('id').primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' })
    .unique(),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),

  ...timestamps,
});

export const sessionsRelations = relations(sessionsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [sessionsTable.userId],
    references: [usersTable.id],
  }),
}));

export type TSession = typeof sessionsTable.$inferSelect;
export type TSessionInsert = typeof sessionsTable.$inferInsert;
