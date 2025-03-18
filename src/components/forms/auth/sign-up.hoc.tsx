'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { TSignUpSchema, signUpDefaultValues, signUpSchema } from './_schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpForm } from './sign-up.component';

export const WithSignUpForm = () => {
  const methods = useForm<TSignUpSchema>({
    mode: 'all',
    resolver: zodResolver(signUpSchema),
    defaultValues: signUpDefaultValues,
  });

  return (
    <FormProvider {...methods}>
      <SignUpForm />
    </FormProvider>
  );
};
