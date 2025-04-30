import { z } from 'zod';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { usersTable } from '@/db/export-schema';

export const selectUserSchema = createSelectSchema(usersTable);
export const insertUserSchema = createInsertSchema(usersTable);

export const createUserSchema = z.object({
  email: z.string().email('Please enter a valid email'),
});

export const updateUserSchema = createUserSchema.partial();

export type TSelectUser = z.infer<typeof selectUserSchema>;
export type TInsertUser = z.infer<typeof insertUserSchema>;
export type TCreateUser = z.infer<typeof createUserSchema>;
export type TUpdateUser = z.infer<typeof updateUserSchema>;

export const createUserDefaultValues: TCreateUser = {
  email: '',
};
