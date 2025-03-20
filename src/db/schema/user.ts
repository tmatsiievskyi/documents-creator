import { pgTable, timestamp, uuid, varchar, index } from 'drizzle-orm/pg-core';
import { timestamps } from '../helpers';
import { companiesTable } from './companies';
import { relations } from 'drizzle-orm';
import { documentsTable } from './documents';
import { accountsTable } from './account';
import { profilesTable } from './profile';
import { sessionsTable } from './session';
import { verifyEmailTable } from './verify-email';

export const usersTable = pgTable(
  'doc_users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 256 }).unique(),
    emailVerified: timestamp('email_verified', { mode: 'date' }),
    companyId: uuid('company_id').references(() => companiesTable.id, {
      onDelete: 'set null',
    }),
    ...timestamps,
  },
  table => [
    index('users_email_idx').on(table.email),
    index('users_company_id_idx').on(table.companyId),
  ]
);

// --- relations ---

export const usersRelations = relations(usersTable, ({ one, many }) => ({
  company: one(companiesTable, {
    fields: [usersTable.companyId],
    references: [companiesTable.id],
    relationName: 'CompanyEmployees',
  }),
  authoredDocuments: many(documentsTable, {
    relationName: 'AuthoredUserDocuments',
  }),
  ownedDocuments: many(documentsTable, {
    relationName: 'UserOwnedDocuments',
  }),
  userAccounts: many(accountsTable, {
    relationName: 'UserAccounts',
  }),
  userProfile: one(profilesTable, {
    fields: [usersTable.id],
    references: [profilesTable.userId],
    relationName: 'UserProfile',
  }),
  userSession: one(sessionsTable, {
    fields: [usersTable.id],
    references: [sessionsTable.id],
    relationName: 'UserSession',
  }),
  userVerifyEmail: one(verifyEmailTable, {
    fields: [usersTable.id],
    references: [verifyEmailTable.userId],
    relationName: 'UserVerifyEmail',
  }),
}));

export type TUser = typeof usersTable.$inferSelect;
export type TUserInsert = typeof usersTable.$inferInsert;
