import { authenticatedAction } from '@/lib/zsa/safe-action';
import { getUserByIdService } from '@/services/user.service';

export const getUserAction = authenticatedAction.createServerAction().handler(async ({ ctx }) => {
  const { user } = ctx;

  const userWithOptions = await getUserByIdService(user?.id, {
    includeCompanyMemberships: true,
    includeOwnedCompanies: true,
    includeProfile: true,
  });

  return userWithOptions;
});
