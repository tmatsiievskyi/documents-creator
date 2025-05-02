import { string, z } from 'zod';

export const inviteMemberSchema = z.object({
  email: string().min(3),
  excludeCompanyId: string().optional(),
});

export const inviteMemberSchemaFE = inviteMemberSchema.pick({ email: true });

export type TInviteMemberSchema = z.infer<typeof inviteMemberSchema>;
export type TInviteMemberSchemaFE = z.infer<typeof inviteMemberSchemaFE>;

export const inviteMemberDefaultValues: TInviteMemberSchema = {
  email: '',
};
