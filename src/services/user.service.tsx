import { TSignUpSchema } from '@/components/forms/auth/_schemas';
import {
  createAccountDao,
  createProfileByUserId,
  createUserDao,
  getUserByEmail,
  updateUserByIdDao,
} from '@/dao';
import { getVerifyEmailTokenDao, upsertVerifyEmailToken } from '@/dao/verify-email.dao';
import { VerifyEmail } from '@/emails';
import { PublicError } from '@/lib/app-errors';
import { env } from '@/lib/env';
import { sendEmail } from '@/lib/resend';
import { APP_UI_NAME } from '@/shared/constants';

export const registerUserService = async (data: TSignUpSchema) => {
  const userExists = await getUserByEmail(data.email);

  if (userExists) {
    throw new PublicError('User with this email already exists');
  }

  const user = await createUserDao(data.email);
  await createAccountDao(user.id, data.password);
  await createProfileByUserId(user.id, data.fullName);
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
  await updateUserByIdDao(userId, { emailVerified: new Date() });

  return userId;
};
