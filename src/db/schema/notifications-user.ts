import { boolean, index, jsonb, pgEnum, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { usersTable } from './user';
import { timestamps } from '../helpers';
import { relations } from 'drizzle-orm';

export const notificationTypeEnum = pgEnum('user_notification_type', [
  'MENTION_RECEIVED',
  'MESSAGE_RECEIVED',
  'COMPANY_REQUEST_TO_JOIN',
  'USER_ADDED_TO_COMPANY',
  'USER_REMOVED_FROM_COMPANY',
  'ROLE_ASSIGNED',
]);

export const notificationsUserTable = pgTable(
  'doc_notifications_user',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),
    type: notificationTypeEnum('type').notNull(),
    title: text('title').notNull(),
    body: text('body').notNull(),
    isRead: boolean('is_read').notNull().default(false),
    data: jsonb('data'),
    ...timestamps,
  },

  table => [
    index('notifications_user_id_idx').on(table.userId),
    index('notifications_type_idx').on(table.type),
    index('notification_is_read_idx').on(table.isRead),
  ]
);

export const notificationsRelations = relations(notificationsUserTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [notificationsUserTable.userId],
    references: [usersTable.id],
  }),
}));

export type TNotificationUser = typeof notificationsUserTable.$inferSelect;
export type TNotificationUserInsert = typeof notificationsUserTable.$inferInsert;
