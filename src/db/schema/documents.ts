import { check, index, jsonb, pgEnum, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { timestamps } from '../helpers';
import { usersTable } from './user';
import { companiesTable } from './companies';
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

export const documentsTable = pgTable(
  'doc_documents',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    coverImage: text('cover_image'),
    status: documentStatusEnum('status'),

    content: jsonb('content').notNull(),
    plainText: text('plain_text'),

    ownerType: documentOwnerTypeEnum('owner_type').notNull(),
    ownerCompanyId: uuid('owner_company_id').references(() => companiesTable.id, {
      onDelete: 'cascade',
    }),
    ownerUserId: uuid('owner_user_id').references(() => usersTable.id, { onDelete: 'set null' }),

    authorId: uuid('author_id')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'set null' }),

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

export const documentsRelations = relations(documentsTable, ({ one }) => ({
  ownerUser: one(usersTable, {
    fields: [documentsTable.ownerUserId],
    references: [usersTable.id],
  }),
  ownerCompany: one(companiesTable, {
    fields: [documentsTable.ownerCompanyId],
    references: [companiesTable.id],
  }),
  author: one(usersTable, {
    fields: [documentsTable.authorId],
    references: [usersTable.id],
  }),
}));

export type TDocument = typeof documentsTable.$inferSelect;
export type TDocumentInsert = typeof documentsTable.$inferInsert;
