import { z } from 'zod';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { accountsTable } from '@/db/export-schema';

export const selectAccountSchema = createSelectSchema(accountsTable);
export const insertAccountSchema = createInsertSchema(accountsTable);

export const createAccountSchema = z.object({
  userId: z.string().uuid('Invalid user ID format'),
  accountType: z.enum(['email', 'google', 'facebook']),
  facebookId: z.string().optional(),
  googleId: z.string().optional(),
  password: z.string().optional(),
});

export const createEmailAccountSchema = z.object({
  userId: z.string().uuid('Invalid user ID format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  accountType: z.literal('email'),
});

export const createGoogleAccountSchema = z.object({
  userId: z.string().uuid('Invalid user ID format'),
  googleId: z.string().min(1, 'Google ID is required'),
  accountType: z.literal('google'),
});

export const createFacebookAccountSchema = z.object({
  userId: z.string().uuid('Invalid user ID format'),
  facebookId: z.string().min(1, 'Facebook ID is required'),
  accountType: z.literal('facebook'),
});

export const updateAccountSchema = createAccountSchema
  .omit({ userId: true, accountType: true })
  .partial();

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'New password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Confirm password must be at least 8 characters'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type TSelectAccount = z.infer<typeof selectAccountSchema>;
export type TInsertAccount = z.infer<typeof insertAccountSchema>;
export type TCreateAccount = z.infer<typeof createAccountSchema>;
export type TCreateEmailAccount = z.infer<typeof createEmailAccountSchema>;
export type TCreateGoogleAccount = z.infer<typeof createGoogleAccountSchema>;
export type TCreateFacebookAccount = z.infer<typeof createFacebookAccountSchema>;
export type TUpdateAccount = z.infer<typeof updateAccountSchema>;
export type TChangePassword = z.infer<typeof changePasswordSchema>;
