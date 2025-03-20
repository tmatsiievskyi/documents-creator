import {
  createUserByMagicLink,
  deleteMagicLinkByToken,
  getMagicLinkByToken,
  getUserByEmail,
  setEmailVerified,
  upsertMagicLink,
} from '@/dao';
import { createProfileByUserId } from '@/dao/profile.dao';
import { MagicLinkEmail } from '@/emails';
import { PublicError } from '@/lib/app-errors';
import { env } from '@/lib/env';
import { sendEmail } from '@/lib/resend';

export const sendMagicLinkService = async (email: string) => {
  const token = await upsertMagicLink(email);

  await sendEmail(
    email,
    `Your login email for ${env.APP_NAME}`,
    <MagicLinkEmail
      link={`${env.HOST_NAME}/api/sign-in/magic?token=${token}`}
      expiryMinutes={+env.MAGIC_LINK_EXPIRES / 60 / 1000}
    />
  );
};

export const signInWithMagicLinkService = async (token: string) => {
  const magicLinkInfo = await getMagicLinkByToken(token);

  if (!magicLinkInfo) {
    throw new PublicError('Invalid or expired magic link');
  }

  if (magicLinkInfo.tokenExpiresAt! < new Date()) {
    throw new PublicError('Your magic link have expired');
  }

  const existingUser = await getUserByEmail(magicLinkInfo.email);

  if (existingUser) {
    await setEmailVerified(existingUser.id);
    await deleteMagicLinkByToken(token);
    return existingUser;
  } else {
    const newUser = await createUserByMagicLink(magicLinkInfo.email);
    await createProfileByUserId(newUser.id);
    await deleteMagicLinkByToken(token);

    return newUser;
  }
};
