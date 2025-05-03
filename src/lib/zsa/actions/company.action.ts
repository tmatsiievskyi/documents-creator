'use server';

import { z } from 'zod';
import { authenticatedAction } from '../safe-action';
import { rateLimitByKey } from '@/utils/limiter.util';

import { sendCompanyInviteToUserService } from '@/services/company-invites.service';

export const sendInviteToJoinAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      companyId: z.string().uuid(),
      email: z.string().email(),
    })
  )
  .handler(async ({ ctx, input }) => {
    const { user } = ctx;
    const { companyId, email } = input;

    await rateLimitByKey({
      key: `${user.id}-invite-member`,
      limit: 10,
      window: 30000,
    });

    await sendCompanyInviteToUserService(user, companyId, email);

    return { success: true };
  });
