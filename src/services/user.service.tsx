import { TSignUpSchema } from '@/components/forms/auth/_schemas';
import {
  createAccountByGoogleDao,
  createProfileByUserId,
  createUserDao,
  getUserByEmailDao,
  getUserByIdDao,
  TGetUserOptions,
  updateUserByIdDao,
} from '@/dao';
import { getVerifyEmailTokenDao, upsertVerifyEmailToken } from '@/dao/verify-email.dao';
import { VerifyEmail } from '@/emails';
import { PublicError } from '@/shared/app-errors';
import { env } from '@/lib/env';
import { sendEmail } from '@/lib/resend';
import { APP_UI_NAME } from '@/shared/constants';
import { timeUTC } from '@/utils';
import { createServiceLogger } from '@/lib/logger/logger';
import { TGoogleUser } from '@/shared/types';

const logger = createServiceLogger('user.service');

export const registerUserService = async (data: TSignUpSchema) => {
  const userExists = await getUserByEmailDao(data.email);

  if (userExists) {
    throw new PublicError('User with this email already exists');
  }

  const user = await createUserDao({
    userData: { email: data.email },
    accountData: { password: data.password, accountType: 'email' },
    profileData: { fullName: data.fullName },
  });
  const token = await upsertVerifyEmailToken(user.id);

  await sendEmail(
    data.email,
    `Verify your email for ${APP_UI_NAME}`,
    <VerifyEmail link={`${env.HOST_NAME}/api/sign-up/verify-email?token=${token}`} />
  );

  return { id: user.id };
};

export const verifyEmailTokenService = async (token: string) => {
  const tokenExists = await getVerifyEmailTokenDao(token);

  if (!tokenExists) {
    throw new PublicError('Token does not exists');
  }

  const userId = tokenExists.userId;
  await updateUserByIdDao(userId, { userData: { emailVerified: timeUTC() } });

  return userId;
};

export const getUserByIdService = async (userId: string, options: TGetUserOptions) => {
  logger.debug({ userId, options }, 'SERVICE. Get User by ID');
  const user = await getUserByIdDao(userId, options);

  if (!user) {
    logger.warn({ userId });
    throw new PublicError('User was not found');
  }

  logger.info({ userId, email: user.email }, 'Retrieved User');
  return user;
};

export const createUserByGoogle = async (googleUser: TGoogleUser) => {
  let existingUser = await getUserByEmailDao(googleUser.email);

  if (!existingUser) {
    existingUser = await createUserDao({ userData: { email: googleUser.email } });
  }

  const [userProfile, userAccounts] = await Promise.all([
    createProfileByUserId(existingUser.id, googleUser.picture, googleUser.name),
    createAccountByGoogleDao(existingUser.id, googleUser.sub),
  ]);

  return {
    user: existingUser,
    userProfile,
    userAccounts,
  };
};
