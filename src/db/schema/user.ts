import { pgTable, timestamp, uuid, varchar, index } from 'drizzle-orm/pg-core';
import { timestamps } from '../helpers';
import { relations } from 'drizzle-orm';
import { documentsTable } from './documents';
import { accountsTable } from './account';
import { profilesTable } from './profile';
import { sessionsTable } from './session';
import { verifyEmailTable } from './verify-email';
import { companiesTable } from './companies';
import { usersToCompaniesTable } from './users-to-companies';

export const usersTable = pgTable(
  'doc_users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 256 }).unique(),
    emailVerified: timestamp('email_verified', { withTimezone: true, mode: 'date' }),

    ...timestamps,
  },
  table => [index('users_email_idx').on(table.email)]
);

// --- relations ---

export const usersRelations = relations(usersTable, ({ one, many }) => ({
  authoredDocuments: many(documentsTable),
  ownedDocuments: many(documentsTable),
  userAccounts: many(accountsTable),
  userProfile: one(profilesTable, {
    fields: [usersTable.id],
    references: [profilesTable.userId],
  }),
  userSession: one(sessionsTable, {
    fields: [usersTable.id],
    references: [sessionsTable.id],
  }),
  userVerifyEmail: one(verifyEmailTable, {
    fields: [usersTable.id],
    references: [verifyEmailTable.userId],
  }),
  ownedCompanies: many(companiesTable),
  member: many(usersToCompaniesTable, { relationName: 'member' }),
  inviter: many(usersToCompaniesTable, { relationName: 'inviter' }),
}));

export type TUser = typeof usersTable.$inferSelect;
export type TUserInsert = typeof usersTable.$inferInsert;
