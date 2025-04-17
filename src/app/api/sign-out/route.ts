import { redirect } from '@/lib/i18n';
import { deleteSession, deleteSessionTokenCookie } from '@/lib/sessions';
import { validateRequest } from '@/services';
import { URL_SIGN_IN } from '@/shared/constants';
import { getLocale } from 'next-intl/server';

export const GET = async (req: Request) => {
  const { session } = await validateRequest();
  const locale = await getLocale();

  await deleteSessionTokenCookie();

  if (session) {
    await deleteSession(session.id);
  }

  redirect({ href: URL_SIGN_IN, locale });
};
