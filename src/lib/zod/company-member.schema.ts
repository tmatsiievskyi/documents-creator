import { string, z } from 'zod';

export const inviteMemberSchema = z.object({
  email: string().min(3),
  excludeCompanyId: string().optional(),
});

export type TInviteMemberSchema = z.infer<typeof inviteMemberSchema>;

export const inviteMemberDefaultValues: TInviteMemberSchema = {
  email: '',
};
