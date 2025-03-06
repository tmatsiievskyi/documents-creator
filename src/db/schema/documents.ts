import { check, index, jsonb, pgEnum, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { timestamps } from '../helpers';
import { users } from './user';
import { companies } from './companies';
import { relations, sql } from 'drizzle-orm';

// Document entity
export const documentStatusEnum = pgEnum('document_status', [
  'DRAFT',
  'PUBLISHED',
  'ARCHIVED',
  'TRASH',
]);

export const documentOwnerTypeEnum = pgEnum('document_owner_type', ['USER', 'COMPANY']);

export const documentVisibility = pgEnum('document_visibility', ['PRIVATE', 'TEAM', 'GROUP']);

export const documents = pgTable(
  'documents',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    coverImage: text('cover_image'),
    status: documentStatusEnum('status'),

    content: jsonb('content').notNull(),
    plainText: text('plain_text'),

    ownerType: documentOwnerTypeEnum('owner_type').notNull(),
    ownerCompanyId: uuid('owner_company_id').references(() => companies.id, {
      onDelete: 'cascade',
    }),
    ownerUserId: uuid('owner_user_id').references(() => users.id, { onDelete: 'set null' }),

    authorId: uuid('author_id')
      .notNull()
      .references(() => users.id, { onDelete: 'set null' }),

    ...timestamps,
  },
  table => [
    index('documents_author_id_idx').on(table.authorId),
    index('documents_owner_user_id_idx').on(table.ownerUserId),
    index('documents_owner_company_id_idx').on(table.ownerCompanyId),
    index('documents_created_at_idx').on(table.created_at),
    index('documents_updated_at_idx').on(table.updated_at),
    check(
      'document_owner_check',
      sql`${table.ownerType} = 'USER' AND ${table.ownerUserId} IS NOT NULL AND ${table.ownerCompanyId} IS NULL
        OR ${table.ownerType} = 'COMPANY' AND ${table.ownerCompanyId} IS NOT NULL AND ${table.ownerUserId} IS NULL
      `
    ),
  ]
);

export const documentsRelations = relations(documents, ({ one }) => ({
  ownerUser: one(users, {
    fields: [documents.ownerUserId],
    references: [users.id],
    relationName: 'UserOwnedDocuments',
  }),
  ownerCompany: one(companies, {
    fields: [documents.ownerCompanyId],
    references: [companies.id],
    relationName: 'CompanyOwnedDocuments',
  }),
  author: one(users, {
    fields: [documents.authorId],
    references: [users.id],
    relationName: 'AuthoredUserDocuments',
  }),
}));

export type TDocument = typeof documents.$inferSelect;
export type TDocumentInsert = typeof documents.$inferInsert;
