import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { usersTable } from './user';
import { timestamps } from '../helpers';
import { relations } from 'drizzle-orm';

export const verifyEmailTable = pgTable('doc_verify_email', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  token: text('token').notNull().unique(),
  tokenExpiresAt: timestamp('token_expires_at', { mode: 'date' }),

  ...timestamps,
});

export const verifyEmailRelations = relations(verifyEmailTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [verifyEmailTable.userId],
    references: [usersTable.id],
    relationName: 'UserVerifyEmail',
  }),
}));

export type TVerifyEmail = typeof verifyEmailTable.$inferSelect;
export type TVerifyEmailInsert = typeof verifyEmailTable.$inferInsert;
