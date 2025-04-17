'use server';

import { signInMagicSchema } from '@/components/forms/auth/_schemas';
import { unathenticatedAction } from '@/lib/safe-action';
import { deleteSession, deleteSessionTokenCookie } from '@/lib/sessions';
import { validateRequest } from '@/services';
import { sendMagicLinkService } from '@/services/magic-link.service';
import { URL_MAGIC_SIGN_IN, URL_SIGN_IN } from '@/shared/constants';
import { rateLimitByKey } from '@/utils/limiter.util';
import { redirect } from 'next/navigation';

export const signInMagicLinkAction = unathenticatedAction
  .createServerAction()
  .input(signInMagicSchema)

  .handler(async ({ input }) => {
    await rateLimitByKey({ key: input.email });
    await sendMagicLinkService(input.email);
    redirect(URL_MAGIC_SIGN_IN);
  });

export const signOutAction = async () => {
  const { session } = await validateRequest();

  await deleteSessionTokenCookie();

  if (!session) {
    redirect(URL_SIGN_IN);
  }

  await deleteSession(session.id);

  redirect(URL_SIGN_IN);
};
