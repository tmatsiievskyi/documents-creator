import { rateLimitByKey } from '@/utils/limiter.util';
import { AuthError, PublicError } from '../shared/app-errors';
import { env } from './env';
import { createServerActionProcedure } from 'zsa';
import { getCurrentUser } from '@/services';
import { API_SIGN_OUT } from '@/shared/constants';
import { redirect, RedirectType } from 'next/navigation';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const shapeErrors = async ({ err }: any) => {
  const isAllowedError = err instanceof PublicError;

  const isDev = env.NEXT_PUBLIC_NODE_ENV === 'development';

  if (err instanceof AuthError) {
    return redirect(API_SIGN_OUT, RedirectType.replace);
  }

  if (isAllowedError || isDev) {
    return {
      code: err.code ?? 'ERROR',
      message: `${!isAllowedError && isDev ? 'DEV ONLY ENABLED - ' : ''}${err.message}`,
    };
  } else {
    return {
      code: 'ERROR',
      message: 'Something went wrong',
    };
  }
};

export const authenticatedAction = createServerActionProcedure()
  .experimental_shapeError(shapeErrors)
  .handler(async () => {
    const user = await getCurrentUser();

    await rateLimitByKey({
      key: `${user?.id}-global`,
      limit: 10,
      window: 10000,
    });
    return { user };
  });

export const unathenticatedAction = createServerActionProcedure()
  .experimental_shapeError(shapeErrors)
  .handler(async () => {
    await rateLimitByKey({
      key: 'unathenticatedAction-global',
      limit: 10,
      window: 10000,
    });
  });
