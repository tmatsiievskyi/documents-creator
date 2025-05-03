import { database } from '@/db';
import { notificationsUserTable, TNotificationUserInsert } from '@/db/export-schema';
import { createDaoLogger } from '@/lib/logger/logger';
import { errorHandler } from '@/utils';

const logger = createDaoLogger('user-notifications.dao');

export const createUserNotificationDao = async (data: TNotificationUserInsert) => {
  logger.debug(
    {
      userId: data.userId,
      type: data.type,
    },
    'Creating notification for user'
  );

  try {
    const [notification] = await database.insert(notificationsUserTable).values(data).returning();

    logger.info(
      {
        notificationId: notification.id,
        userId: notification.userId,
        type: data.type,
      },
      'User notification created'
    );

    return notification;
  } catch (error) {
    logger.error({
      error: errorHandler(error),
      stack: error instanceof Error ? error.stack : undefined,
      table: 'doc_notifications_user',
    });
  }
};
