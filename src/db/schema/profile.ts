import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { usersTable } from './user';
import { relations } from 'drizzle-orm';
import { timestamps } from '../helpers';

export const profilesTable = pgTable('doc_profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' })
    .unique(),
  fullName: text('full_name'),
  imageId: text('image_id'),
  image: text('image'),

  ...timestamps,
});

export const profilesRelations = relations(profilesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [profilesTable.userId],
    references: [usersTable.id],
    relationName: 'UserProfile',
  }),
}));

export type TProfile = typeof profilesTable.$inferSelect;
export type TProfileInsert = typeof profilesTable.$inferInsert;
