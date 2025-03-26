'use client';

import { RHFInput } from '@/lib/rhf';
import { signUpDefaultValues, signUpSchema, TSignUpSchema } from './_schemas';
import { useForm } from 'react-hook-form';
import { Link } from '@/lib/i18n';
// import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/ui';
import { useServerAction } from 'zsa-react';
import { signUpAction } from '@/app/[locale]/(platform)/auth/sign-up/actions';
import { toast } from 'sonner';
import { LoadingButton } from '@/components/buttons';
import { URL_SIGN_IN } from '@/shared/constants';
import { useTranslations } from 'next-intl';

export const SignUpForm = () => {
  const t = useTranslations('sign_up_email_form');
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
          label={t('input_fullname_label')}
          placeholder={t('input_fullname_placeholder')}
        />

        <RHFInput<TSignUpSchema>
          name="email"
          label={t('input_email_label')}
          placeholder={t('input_email_placeholder')}
        />
        <RHFInput<TSignUpSchema>
          name="password"
          label={t('input_password_label')}
          placeholder={t('input_password_placeholder')}
          type="password"
        />
        <RHFInput<TSignUpSchema>
          name="passwordConfirm"
          label={t('input_password_confirm_label')}
          placeholder={t('input_password_confirm_placeholder')}
          type="password"
        />
        <LoadingButton type="submit" className="form-submit-button" isLooading={isPending}>
          {t('button')}
        </LoadingButton>
        <div className=" body-2 flex-center">
          <p className="text-muted-200">{t('sign_up_question')}</p>{' '}
          <Link className="ml-2 text-primary" href={URL_SIGN_IN}>
            {t('link')}
          </Link>
        </div>
      </form>
    </Form>
  );
};
