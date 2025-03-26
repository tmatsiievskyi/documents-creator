'use client';

import { RHFInput } from '@/lib/rhf';
import {
  signInMagicDefaultValues,
  signInMagicSchema,
  TSignInMagicSchema,
} from '../../../../../components/forms/auth/_schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/ui';
import { useServerAction } from 'zsa-react';
import { signInMagicLinkAction } from './actions';
import { componentEnv } from '@/utils';
import { toast } from 'sonner';
import { LoadingButton } from '@/components/buttons';
import { useTranslations } from 'next-intl';

export const SignInMagicForm = () => {
  const t = useTranslations('sign-in_form');
  const form = useForm<TSignInMagicSchema>({
    resolver: zodResolver(signInMagicSchema),
    defaultValues: signInMagicDefaultValues,
  });

  componentEnv(SignInMagicForm.name);

  const { execute, isPending } = useServerAction(signInMagicLinkAction, {
    onError({ err }) {
      toast.error('Something went wrong', {
        description: err.message,
      });
    },
  });

  const onSubmit = (values: TSignInMagicSchema) => {
    execute(values);
  };

  return (
    <Form {...form}>
      <form className="auth-form text-left" onSubmit={form.handleSubmit(onSubmit)}>
        <RHFInput<TSignInMagicSchema>
          name="email"
          label={t('input_label')}
          placeholder={t('input_placeholder')}
        />

        <LoadingButton isLooading={isPending}>{t('button')}</LoadingButton>
      </form>
    </Form>
  );
};
