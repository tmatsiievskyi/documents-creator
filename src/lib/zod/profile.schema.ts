import { z } from 'zod';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { profilesTable } from '@/db/export-schema';
import { MAX_UPLOAD_IMAGE_SIZE } from '@/shared/constants';

export const selectProfileSchema = createSelectSchema(profilesTable);
export const insertProfileSchema = createInsertSchema(profilesTable);

export const createProfileSchema = z.object({
  userId: z.string().uuid('Invalid user ID format'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters').optional(),
  image: z
    .union([
      typeof File !== 'undefined'
        ? z.instanceof(File).refine(file => file.size < MAX_UPLOAD_IMAGE_SIZE, {
            message: `Image must be less than ${MAX_UPLOAD_IMAGE_SIZE / 1024 / 1024}MB`,
          })
        : z.any(),
      z.string().optional(),
      z.null(),
    ])
    .optional(),
  imageId: z.string().optional(),
});

export const updateProfileSchema = createProfileSchema.omit({ userId: true }).partial();

export type TSelectProfile = z.infer<typeof selectProfileSchema>;
export type TInsertProfile = z.infer<typeof insertProfileSchema>;
export type TCreateProfile = z.infer<typeof createProfileSchema>;
export type TUpdateProfile = z.infer<typeof updateProfileSchema>;

export const createProfileDefaultValues: Omit<TCreateProfile, 'userId'> = {
  fullName: '',
  image: null,
  imageId: undefined,
};
