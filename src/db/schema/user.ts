import { pgTable, timestamp, uuid, varchar, index } from 'drizzle-orm/pg-core';
import { timestamps } from '../helpers';
import { companies } from './companies';
import { relations } from 'drizzle-orm';
import { documents } from './documents';

export const users = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 256 }).unique(),
    emailVerified: timestamp('email_verified', { mode: 'date' }),
    companyId: uuid('company_id').references(() => companies.id, {
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

export const usersRelations = relations(users, ({ one, many }) => ({
  company: one(companies, {
    fields: [users.companyId],
    references: [companies.id],
    relationName: 'CompanyEmployees',
  }),
  authoredDocuments: many(documents, {
    relationName: 'AuthoredUserDocuments',
  }),
  ownedDocuments: many(documents, {
    relationName: 'UserOwnedDocuments',
  }),
}));

export type TUser = typeof users.$inferSelect;
export type TUSerInsert = typeof users.$inferInsert;
