import { index, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { timestamps } from '../helpers';
import { relations } from 'drizzle-orm';
import { documentsTable } from './documents';
import { usersTable } from './user';

export const companiesTable = pgTable(
  'doc_companies',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull().unique(),
    companyImage: text('company_image'),

    ...timestamps,
  },
  table => [index('companies_name_idx').on(table.name)]
);

export const companiesRelations = relations(companiesTable, ({ many }) => ({
  employees: many(usersTable, {
    relationName: 'CompanyUsers',
  }),
  ownedDocuments: many(documentsTable, {
    relationName: 'CompanyOwnedDocuments',
  }),
}));

export type TCompanies = typeof companiesTable.$inferSelect;
export type TCompaniesInsert = typeof companiesTable.$inferInsert;
