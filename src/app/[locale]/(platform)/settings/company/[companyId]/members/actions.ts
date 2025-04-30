import { authenticatedAction } from '@/lib/zsa/safe-action';
import { fullCompanySchema } from '@/lib/zod';
import { getCompanyByIdService, isUserOwnerOrAdminService } from '@/services';
import { z } from 'zod';

export const getCompanyMembersAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      companyId: z.string(),
    })
  )
  .output(
    z.object({
      company: fullCompanySchema,
      isOwnerOrAdmin: z.boolean(),
    })
  )
  .handler(async ({ ctx, input }) => {
    const { user } = ctx;
    const company = await getCompanyByIdService(input.companyId, {
      includeMembers: true,
      inlcudeOwner: true,
    });

    const isOwnerOrAdmin = isUserOwnerOrAdminService(user.id, company);

    return { company, isOwnerOrAdmin };
  });
