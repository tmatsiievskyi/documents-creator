'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { signInEmailDefaultValues, signInEmailSchema, TSignInEmailSchema } from './_schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInEmailForm } from './sign-in_email.component';

export const WithSignInEmailForm = () => {
  const methods = useForm<TSignInEmailSchema>({
    mode: 'all',
    resolver: zodResolver(signInEmailSchema),
    defaultValues: signInEmailDefaultValues,
  });

  return (
    <FormProvider {...methods}>
      <SignInEmailForm />
    </FormProvider>
  );
};
