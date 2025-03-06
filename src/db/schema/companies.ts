import { index, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { timestamps } from '../helpers';
import { relations } from 'drizzle-orm';
import { documents } from './documents';
import { users } from './user';

export const companies = pgTable(
  'companies',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull().unique(),
    companyImage: text('company_image'),

    ...timestamps,
  },
  table => [index('companies_name_idx').on(table.name)]
);

export const companiesRelations = relations(companies, ({ many }) => ({
  employees: many(users, {
    relationName: 'CompanyUsers',
  }),
  ownedDocuments: many(documents, {
    relationName: 'CompanyOwnedDocuments',
  }),
}));

export type TCompanies = typeof companies.$inferSelect;
export type TCompaniesInsert = typeof companies.$inferInsert;
