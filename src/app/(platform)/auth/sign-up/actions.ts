'use server';

import { signUpSchema } from '@/components/forms/auth/_schemas';
import { unathenticatedAction } from '@/lib/safe-action';
import { registerUserService } from '@/services/user.service';
import { URL_SIGN_UP_EMAIL } from '@/shared/constants';
import { rateLimitByIp } from '@/utils/limiter.util';
import { redirect } from 'next/navigation';

export const signUpAction = unathenticatedAction
  .createServerAction()
  .input(signUpSchema)

  .handler(async ({ input }) => {
    await rateLimitByIp({ key: 'register', limit: 3, window: 10000 });
    await registerUserService(input);
    return redirect(URL_SIGN_UP_EMAIL);
  });
