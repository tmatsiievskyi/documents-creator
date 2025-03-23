import { index, pgEnum, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { usersTable } from './user';
import { relations } from 'drizzle-orm';
import { timestamps } from '../helpers';

export const accountTypeEnum = pgEnum('type', ['email', 'google', 'facebook']);

export const accountsTable = pgTable(
  'doc_accounts',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),
    accountType: accountTypeEnum('account_type').notNull(),
    facebookId: text('facebook_id').unique(),
    googleId: text('google_id').unique(),
    password: text('password'),

    ...timestamps,
  },
  table => [index('user_id_account_type_idx').on(table.userId, table.accountType)]
);

export const accountsRelations = relations(accountsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [accountsTable.userId],
    references: [usersTable.id],
    relationName: 'UserAccounts',
  }),
}));

export type TAccount = typeof accountsTable.$inferSelect;
export type TAccountInsert = typeof accountsTable.$inferInsert;
