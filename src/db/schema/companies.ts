import { index, jsonb, pgEnum, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { timestamps } from '../helpers';
import { relations } from 'drizzle-orm';
import { documentsTable } from './documents';
import { usersTable } from './user';
import { companyInvitesTable } from './company-invites';
import { usersToCompaniesTable } from './users-to-companies';

export const companyStatusEnum = pgEnum('status', ['ACTIVE', 'INACTIVE', 'PENDING_VERIFICATION']);

export const companiesTable = pgTable(
  'doc_companies',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull().unique(),
    status: companyStatusEnum('status').notNull().default('PENDING_VERIFICATION'),
    phone: text('phone'),
    email: text('email'),
    website: text('website'),
    address: jsonb('address'),
    companyImage: text('company_image'),
    companyImageId: text('company_image_id'),
    description: text('description'),
    ownerId: uuid('owner_id')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),
    ...timestamps,
  },
  table => [index('companies_name_idx').on(table.name)]
);

export const companiesRelations = relations(companiesTable, ({ many, one }) => ({
  owner: one(usersTable, {
    fields: [companiesTable.ownerId],
    references: [usersTable.id],
  }),
  usersToCompaniesTable: many(usersToCompaniesTable),
  invites: many(companyInvitesTable),
  ownedDocuments: many(documentsTable),
}));

export type TCompanies = typeof companiesTable.$inferSelect;
export type TCompaniesInsert = typeof companiesTable.$inferInsert;
