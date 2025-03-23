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

  const existingUser = await getUserByEmailDao(magicLinkInfo.email);

  if (existingUser) {
    await updateUserByIdDao(existingUser.id, { userData: { emailVerified: new Date() } });
    await deleteMagicLinkByToken(token);
    return existingUser;
  } else {
    const newUser = await createUserDao({
      userData: { email: magicLinkInfo.email },
      accountData: { accountType: 'email' },
    });
    // await createProfileByUserId(newUser.id);
    await deleteMagicLinkByToken(token);

    return newUser;
  }
};
