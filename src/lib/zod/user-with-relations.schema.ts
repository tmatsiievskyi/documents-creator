import { z } from 'zod';
import { selectUserSchema } from './user.schema';
import { selectProfileSchema } from './profile.schema';
import { selectAccountSchema } from './account.schema';

export const userWithProfileSchema = selectUserSchema.extend({
  userProfile: selectProfileSchema.nullable(),
});

export const userWithAccountsSchema = selectUserSchema.extend({
  userAccounts: z.array(selectAccountSchema).optional(),
});

export const userCompanyRole = z.enum(['ADMIN', 'MANAGER', 'EDITOR', 'VIEWER']);

export const companyMembershipSchema = z.object({
  userId: z.string().uuid(),
  companyId: z.string().uuid(),
  role: userCompanyRole,
  invitedBy: z.string().uuid().nullable(),
  invitedAt: z.date().nullable(),
  acceptedAt: z.date().nullable(),
  created_at: z.date(),
  updated_at: z.date(),
});

export const fullUserSchema = selectUserSchema.extend({
  userProfile: selectProfileSchema.nullable(),
  userAccounts: z.array(selectAccountSchema).optional(),
  companyMemberships: z.array(companyMembershipSchema).optional(),
});

export type TUserWithProfile = z.infer<typeof userWithProfileSchema>;
export type TUserWithAccounts = z.infer<typeof userWithAccountsSchema>;
export type TCompanyMembership = z.infer<typeof companyMembershipSchema>;
export type TFullUser = z.infer<typeof fullUserSchema>;
