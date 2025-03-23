'use client';

import { RHFInput } from '@/lib/rhf';
import { signInEmailDefaultValues, signInEmailSchema, TSignInEmailSchema } from './_schemas';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { URL_SIGN_UP } from '@/shared/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/ui';
import { useServerAction } from 'zsa-react';
import { signInEmailAction } from '@/app/(platform)/auth/sign-in/email/actions';
import { toast } from 'sonner';
import { LoadingButton } from '@/components/buttons';

export const SignInEmailForm = () => {
  const form = useForm<TSignInEmailSchema>({
    resolver: zodResolver(signInEmailSchema),
    defaultValues: signInEmailDefaultValues,
  });

  const { execute, isPending } = useServerAction(signInEmailAction, {
    onError({ err }) {
      toast.error('Something went wrong', {
        description: err?.message,
      });
    },
    onSuccess() {
      toast.success('You have been rock!!', {
        description: 'Enjoy your session',
      });
    },
  });

  const onSubmit = (values: TSignInEmailSchema) => {
    execute(values);
  };

  return (
    <Form {...form}>
      <form className="auth-form text-left" onSubmit={form.handleSubmit(onSubmit)}>
        <RHFInput<TSignInEmailSchema> name="email" label="Email" placeholder="Enter your email" />
        <RHFInput<TSignInEmailSchema>
          name="password"
          label="Password"
          placeholder="Enter your password"
          inputClassName="shad-input"
          type="password"
        />
        <LoadingButton isLooading={isPending}>Sign In</LoadingButton>
        <div className=" body-2 flex-center">
          <p className="text-muted-200">{"Don't have an account?"}</p>{' '}
          <Link className="ml-2 text-primary" href={URL_SIGN_UP}>
            Sign Up
          </Link>
        </div>
      </form>
    </Form>
  );
};
