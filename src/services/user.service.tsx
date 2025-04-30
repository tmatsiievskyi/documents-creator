import {
  createAccountByGoogleDao,
  createProfileByUserId,
  createUserDao,
  getUserByEmailDao,
  getUserByIdDao,
  TGetUserOptions,
  updateUserByIdDao,
  getUserByEmailPatternDao,
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
import { TSignUpSchema } from '@/lib/zod';
import { TUserWithProfile } from '@/lib/zod/user-with-relations.schema';

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
  logger.debug({ userId, options }, 'Get User by ID');
  const user = await getUserByIdDao(userId, options);

  if (!user) {
    logger.warn({ userId });
    throw new PublicError('User was not found');
  }

  logger.info({ userId, email: user.email }, 'Retrieved User');
  return user;
};

export const getUsersByEmailPatternService = async (
  userId: string,
  pattern: string,
  options: TGetUserOptions & { excludeCompanyId?: string } = {}
): Promise<TUserWithProfile[]> => {
  logger.debug({ userId, pattern, options }, 'Getting users by email pattern ');

  const users = await getUserByEmailPatternDao(pattern, options);

  if (users.length === 0) {
    logger.info({ userId, pattern }, 'Users by email with pattern was not found');
  }

  logger.info({ userId, pattern, options }, 'Received users by email pattern');
  return users;
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

export const getProfileImageUrl = () => {};
