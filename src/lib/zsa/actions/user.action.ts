'use server';

import { inviteMemberSchema } from '@/lib/zod/company-member.schema';
import { authenticatedAction } from '../safe-action';
import { getUsersByEmailPatternService } from '@/services/user.service';
import { userWithProfileSchema } from '@/lib/zod/user-with-relations.schema';
import { z } from 'zod';

export const searchUsersAction = authenticatedAction
  .createServerAction()
  .input(inviteMemberSchema)
  .output(z.array(userWithProfileSchema))
  .handler(async ({ ctx, input }) => {
    const { user } = ctx;
    const { email, excludeCompanyId } = input;

    const users = await getUsersByEmailPatternService(user.id, email, {
      includeProfile: true,
      excludeCompanyId,
    });

    return users;
  });
