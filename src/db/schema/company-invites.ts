import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { companiesTable } from './companies';
import { timestamps } from '../helpers';
import { relations } from 'drizzle-orm';
import { usersTable } from './user';

export const companyInvitesStatusEnum = pgEnum('company_request_join_status', [
  'ACCEPTED',
  'PENDING',
  'REJECTED',
]);

export const companyInvitesTable = pgTable('doc_company_invites', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  companyId: uuid('company_id')
    .notNull()
    .references(() => companiesTable.id, { onDelete: 'cascade' }),
  status: companyInvitesStatusEnum('status').notNull().default('PENDING'),
  token: text('token').notNull().unique(),
  inviteExpiresAt: timestamp('invite_expires_at', { withTimezone: true, mode: 'date' }),
  ...timestamps,
});

export const companyInvitesRelations = relations(companyInvitesTable, ({ one }) => ({
  company: one(companiesTable, {
    fields: [companyInvitesTable.companyId],
    references: [companiesTable.id],
  }),
  inviter: one(usersTable, {
    fields: [companyInvitesTable.userId],
    references: [usersTable.id],
  }),
}));

export type TCompanyInvitesToJoin = typeof companyInvitesTable.$inferSelect;
export type TCompanyInvitesToJoinInsert = typeof companyInvitesTable.$inferInsert;
