'use server';

import { redirect } from '@/lib/i18n';
import { authenticatedAction } from '@/lib/zsa/safe-action';
import { createCompanySchema } from '@/lib/zod';
import { createCompanyService } from '@/services';
import { URL_SETTING_COMPANY_INFO } from '@/shared/constants';
import { rateLimitByKey } from '@/utils/limiter.util';
import { getLocale } from 'next-intl/server';
import { revalidatePath } from 'next/cache';

export const createCompanyAction = authenticatedAction
  .createServerAction()
  .input(createCompanySchema)

  .handler(async ({ input, ctx }) => {
    const locale = await getLocale();
    const { user } = ctx;

    await rateLimitByKey({
      key: `${user.id}-create-company`,
    });

    const company = await createCompanyService(user, input);
    revalidatePath('/settings');
    redirect({ href: URL_SETTING_COMPANY_INFO(company.id), locale });
  });
