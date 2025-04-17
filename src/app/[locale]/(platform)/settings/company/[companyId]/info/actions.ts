'use server';

import { authenticatedAction } from '@/lib/safe-action';
import { selectCompanySchema, updateCompanySchemaFE } from '@/lib/zod';
import { getCompanyByIdService, isUserOwnerOrAdminService, updateCompanyService } from '@/services';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const getCompanyInfoAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      companyId: z.string(),
    })
  )
  .output(
    z.object({
      company: selectCompanySchema,
      isOwnerOrAdmin: z.boolean(),
    })
  )
  .handler(async ({ ctx, input }) => {
    const { user } = ctx;

    const company = await getCompanyByIdService(input.companyId, {
      inlcudeOwner: true,
      includeMembers: true,
    });

    const isOwnerOrAdmin = isUserOwnerOrAdminService(user.id, company);

    return { company, isOwnerOrAdmin };
  });

export const updateCompanyInfoAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      companyId: z.string(),
      data: updateCompanySchemaFE,
    })
  )
  // .output(updateCompanySchemaFE)
  .handler(async ({ input, ctx }) => {
    const { user } = ctx;
    const { companyId, data } = input;

    const updatedCompany = await updateCompanyService(user.id, companyId, data);
    revalidatePath(`/settings/company/${companyId}/info`);
    return updatedCompany;
  });
