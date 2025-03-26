/* eslint-disable camelcase */
import {
  createUserDao,
  deleteMagicLinkByToken,
  getMagicLinkByToken,
  getUserByEmailDao,
  updateUserByIdDao,
  upsertMagicLink,
} from '@/dao';
import { MagicLinkEmail } from '@/emails';
import { PublicError } from '@/shared/app-errors';
import { env } from '@/lib/env';
import { sendEmail } from '@/lib/resend';
import { createServiceLogger } from '@/lib/logger/logger';
import { timeUTC } from '@/utils';
import { getTranslations } from 'next-intl/server';

const logger = createServiceLogger('magic-link-service');

export const sendMagicLinkService = async (email: string) => {
  logger.debug({ email }, 'Attempting to send magic link email');
  const t = await getTranslations('email.magic_link');
  const token = await upsertMagicLink(email);
  const app_name = `${env.APP_NAME}`;

  const emailTitle = t('preview', { app_name });

  try {
    await sendEmail(
      email,
      emailTitle,
      <MagicLinkEmail
        link={`${env.HOST_NAME}/api/sign-in/magic?token=${token}`}
        expiryMinutes={+env.MAGIC_LINK_EXPIRES / 60 / 1000}
      />
    );
    logger.info({ email }, 'Sent magic-link email successfully');
  } catch (error) {
    logger.error({ error }, 'Magic-link email was not send');
    throw error;
  }
};

export const signInWithMagicLinkService = async (token: string) => {
  logger.debug('Attempting to login with magic link');
  const magicLinkInfo = await getMagicLinkByToken(token);

  if (!magicLinkInfo) {
    logger.info('Magic Link not found');
    throw new PublicError('Invalid or expired magic link');
  }

  if (magicLinkInfo.tokenExpiresAt! < timeUTC()) {
    logger.info({ email: magicLinkInfo.email }, 'Magic Link has expired');
    throw new PublicError('Your magic link have expired');
  }

  const existingUser = await getUserByEmailDao(magicLinkInfo.email);

  if (existingUser) {
    await updateUserByIdDao(existingUser.id, { userData: { emailVerified: timeUTC() } });
    await deleteMagicLinkByToken(token);
    logger.info({ email: existingUser.email }, 'Magic link. Used existing user');
    return existingUser;
  } else {
    const newUser = await createUserDao({
      userData: { email: magicLinkInfo.email },
      accountData: { accountType: 'email' },
    });
    logger.info({ email: newUser.email }, 'Magic link. Created new user');
    await deleteMagicLinkByToken(token);

    logger.info({ email: newUser.email }, 'Deleted magic link');
    return newUser;
  }
};
