import { MAX_UPLOAD_IMAGE_SIZE } from '@/shared/constants';
import { z } from 'zod';
import { createUpdateSchema, createSelectSchema } from 'drizzle-zod';
import { companiesTable } from '@/db/export-schema';

const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
type Literal = z.infer<typeof literalSchema>;
type Json = Literal | { [key: string]: Json } | Json[];
const jsonSchema: z.ZodType<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)])
);

export const addressSchema = z
  .object({
    street: z.string().optional().nullable(),
    city: z.string().optional().nullable(),
    state: z.string().optional().nullable(),
    postalCode: z.string().optional().nullable(),
    country: z.string().optional().nullable(),
  })
  .nullable();

export const createCompanySchema = z.object({
  name: z.string().min(1, 'Company name is required').max(100, 'Company name is too long'),
  status: z.enum(['ACTIVE', 'INACTIVE', 'PENDING_VERIFICATION']).default('PENDING_VERIFICATION'),
  description: z.string().optional().nullable(),
  email: z.string().email('Please enter a valid email').optional().nullable(),
  phone: z.string().optional().nullable(),
  website: z.string().url('Please enter a valid URL').optional().nullable(),
  address: addressSchema,
  companyImage: z
    .instanceof(File)
    .refine(file => file.size < MAX_UPLOAD_IMAGE_SIZE, {
      message: `Image must be less than ${MAX_UPLOAD_IMAGE_SIZE / 1024 / 1024}MB`,
    })
    .optional()
    .nullable(),
}); // TODO: check

export const updateCompanySchemaBE = createUpdateSchema(companiesTable);
export const updateCompanySchemaFE = createUpdateSchema(companiesTable, {
  name: s => s.nonempty('company_name_required').max(100, 'company_name_too_long'),
  phone: s => s.nonempty('phone_required'),
  email: s => s.nonempty('email_required').email('email_format'),
  website: s => s.nonempty('website_required'),
  address: addressSchema,
  companyImage: z
    .union([
      z.instanceof(File).refine(file => file.size < MAX_UPLOAD_IMAGE_SIZE, {
        message: `Image must be less than ${MAX_UPLOAD_IMAGE_SIZE / 1024 / 1024}MB`,
      }),
      z.string().optional(),
      z.null(),
    ])
    .optional(),
});

export const selectCompanySchema = createSelectSchema(companiesTable, {
  address: addressSchema,
});

export type TCreateCompanySchema = z.infer<typeof createCompanySchema>;
// export type TUpdateCompanySchema = z.infer<typeof updateCompanySchema>;
export type TUpdateCompanySchemaFE = typeof updateCompanySchemaFE._type;
export type TSelectCompanySchema = z.infer<typeof selectCompanySchema>;

export const createCompanyDefaultValues: TCreateCompanySchema = {
  name: '',
  status: 'PENDING_VERIFICATION',
  phone: '',
  email: '',
  website: '',
  address: {
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  },
  description: '',
  companyImage: undefined,
};
