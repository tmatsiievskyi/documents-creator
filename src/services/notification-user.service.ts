import { createUserNotificationDao } from '@/dao/notification-user.dao';
import { TNotificationUserInsert } from '@/db/export-schema';
import { createServiceLogger } from '@/lib/logger/logger';
import { PublicError } from '@/shared/app-errors';

const logger = createServiceLogger('notification-user.service');

export const createUserNotificationService = async (
  userId: string,
  data: TNotificationUserInsert
) => {
  logger.debug({ userId, data }, 'Creating user notification');

  const notification = await createUserNotificationDao(data);
  if (!notification) {
    throw new PublicError('Failed to create notification');
  }

  logger.info({ notificationId: notification.id }, 'User notification created');

  return notification;
};
