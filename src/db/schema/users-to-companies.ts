import { pgEnum, pgTable, primaryKey, timestamp, uuid } from 'drizzle-orm/pg-core';
import { usersTable } from './user';
import { companiesTable } from './companies';
import { timestamps } from '../helpers';
import { relations } from 'drizzle-orm';

export const companyRoleEnum = pgEnum('company_role', ['ADMIN', 'MANAGER', 'EDITOR', 'VIEWER']);

export const usersToCompaniesTable = pgTable(
  'doc_users_to_companies',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),
    companyId: uuid('company_id')
      .notNull()
      .references(() => companiesTable.id, { onDelete: 'cascade' }),
    role: companyRoleEnum('role').notNull().default('VIEWER'),
    invitedBy: uuid('invited_by').references(() => usersTable.id, { onDelete: 'set null' }),
    invitedAt: timestamp('invited_at', { withTimezone: true, mode: 'date' }),
    acceptedAt: timestamp('accepted_at', { withTimezone: true, mode: 'date' }),

    ...timestamps,
  },
  t => [primaryKey({ columns: [t.userId, t.companyId] })]
);

export const usersToCompaniesRelations = relations(usersToCompaniesTable, ({ one }) => ({
  member: one(usersTable, {
    fields: [usersToCompaniesTable.userId],
    references: [usersTable.id],
    relationName: 'member',
  }),
  company: one(companiesTable, {
    fields: [usersToCompaniesTable.companyId],
    references: [companiesTable.id],
    relationName: 'company',
  }),
  inviter: one(usersTable, {
    fields: [usersToCompaniesTable.invitedBy],
    references: [usersTable.id],
    relationName: 'inviter',
  }),
}));

export type TUsersToCompanies = typeof usersToCompaniesTable.$inferSelect;
export type TUsersToCompaniesInsert = typeof usersToCompaniesTable.$inferInsert;
