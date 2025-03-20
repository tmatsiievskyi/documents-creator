'use client';

import { RHFInput } from '@/lib/rhf';
import { signUpDefaultValues, signUpSchema, TSignUpSchema } from './_schemas';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/ui';
import { useServerAction } from 'zsa-react';
import { signUpAction } from '@/app/(platform)/auth/sign-up/actions';
import { toast } from 'sonner';
import { LoadingButton } from '@/components/buttons';
import { URL_SIGN_IN } from '@/shared/constants';

export const SignUpForm = () => {
  const form = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: signUpDefaultValues,
  });

  const { execute, isPending } = useServerAction(signUpAction, {
    onError({ err }) {
      toast.error('Something went wrong', {
        description: err.message,
      });
    },
  });

  const onSubmit = (values: TSignUpSchema) => {
    execute(values);
  };

  return (
    <Form {...form}>
      <form className="auth-form" onSubmit={form.handleSubmit(onSubmit)}>
        <RHFInput<TSignUpSchema>
          name="fullName"
          label="Full Name"
          placeholder="Enter your Full Name"
        />

        <RHFInput<TSignUpSchema> name="email" label="Email" placeholder="Enter your email" />
        <RHFInput<TSignUpSchema>
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
        />
        <RHFInput<TSignUpSchema>
          name="passwordConfirm"
          label="Password Confirm"
          placeholder="Repeat your password"
          type="password"
        />
        <LoadingButton type="submit" className="form-submit-button" isLooading={isPending}>
          Sign Up
        </LoadingButton>
        <div className=" body-2 flex-center">
          <p className="text-muted-200">Already have an account?</p>{' '}
          <Link className="text-primary ml-2" href={URL_SIGN_IN}>
            Sign In
          </Link>
        </div>
      </form>
    </Form>
  );
};
