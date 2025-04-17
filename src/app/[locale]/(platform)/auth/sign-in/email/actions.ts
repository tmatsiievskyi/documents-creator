'use server';

import { signInEmailSchema } from '@/components/forms/auth/_schemas';
import { unathenticatedAction } from '@/lib/safe-action';
import { setSession } from '@/lib/sessions';
import { signInUserWithEmailService } from '@/services';
import { URL_AFTER_LOGIN } from '@/shared/constants';
import { rateLimitByKey } from '@/utils/limiter.util';
import { redirect } from 'next/navigation';

export const signInEmailAction = unathenticatedAction
  .createServerAction()
  .input(signInEmailSchema)

  .handler(async ({ input }) => {
    await rateLimitByKey({ key: input.email, limit: 3, window: 10000 });
    const user = await signInUserWithEmailService(input);
    await setSession(user.id);
    redirect(URL_AFTER_LOGIN);
  });
