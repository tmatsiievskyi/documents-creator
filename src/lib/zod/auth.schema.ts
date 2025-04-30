import { object, string, z } from 'zod';

export const signInEmailSchema = object({
  email: string()
    .email({ message: 'Please enter a valid email address' })
    .max(256, {
      message: 'Email can not be longer than 256 characters',
    })
    .min(1, { message: 'Email is required' }),

  password: string()
    .min(1, { message: 'Password is required' })
    .min(8, { message: 'Password must contain at least 8 character' })
    .max(256, { message: 'Password can not be longer than 256 characters' })
    .refine(password => /[a-z]/.test(password), {
      message: 'Password must contain at least one lowercase letter',
    })
    .refine(password => /[A-Z]/.test(password), {
      message: 'Password must contain at least one uppercase letter',
    })
    .refine(password => /[0-9]/.test(password), {
      message: 'Password must contain at least one number',
    }),
});

export const signInMagicSchema = object({
  email: string()
    .max(256, {
      message: 'Email can not be longer than 256 characters',
    })
    .min(1, { message: 'Email is required' }),
});

export const signUpSchema = object({
  fullName: string()
    .min(1, { message: 'Full Name is required' })
    .max(256, { message: 'Full Name can not be longer than 256 characters' }),
  email: string()
    .max(256, {
      message: 'Email can not be longer than 256 characters',
    })
    .min(1, { message: 'Email is required' }),

  password: string()
    .min(1, { message: 'Password is required' })
    .min(8, { message: 'Password must contain at least 8 character' })
    .max(256, { message: 'Password can not be longer than 256 characters' })
    .refine(password => /[a-z]/.test(password), {
      message: 'Password must contain at least one lowercase letter',
    })
    .refine(password => /[A-Z]/.test(password), {
      message: 'Password must contain at least one uppercase letter',
    })
    .refine(password => /[0-9]/.test(password), {
      message: 'Password must contain at least one number',
    }),

  passwordConfirm: string().min(1, 'Please confirm your password'),
}).refine(data => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Passwords do not match',
});

export type TSignInEmailSchema = z.infer<typeof signInEmailSchema>;
export type TSignInMagicSchema = z.infer<typeof signInMagicSchema>;
export type TSignUpSchema = z.infer<typeof signUpSchema>;

export const signInEmailDefaultValues: TSignInEmailSchema = {
  email: '',
  password: '',
};

export const signInMagicDefaultValues: TSignInMagicSchema = {
  email: '',
};

export const signUpDefaultValues: TSignUpSchema = {
  email: '',
  fullName: '',
  password: '',
  passwordConfirm: '',
};
