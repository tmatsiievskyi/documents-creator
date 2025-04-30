'use client';

import { RHFInput } from '@/lib/rhf';
import { useForm } from 'react-hook-form';
import { Link } from '@/lib/i18n';
import { URL_SIGN_UP } from '@/shared/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/ui';
import { useServerAction } from 'zsa-react';
import { signInEmailAction } from '@/app/[locale]/(platform)/auth/sign-in/email/actions';
import { toast } from 'sonner';
import { LoadingButton } from '@/components/buttons';
import { useTranslations } from 'next-intl';
import { signInEmailDefaultValues, signInEmailSchema, TSignInEmailSchema } from '@/lib/zod';

export const SignInEmailForm = () => {
  const t = useTranslations('sign_in_email_form');
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
        <RHFInput<TSignInEmailSchema>
          name="email"
          label={t('input_email_label')}
          placeholder={t('input_email_placeholder')}
        />
        <RHFInput<TSignInEmailSchema>
          name="password"
          label={t('input_password_label')}
          placeholder={t('input_password_placeholder')}
          inputClassName="shad-input"
          type="password"
        />
        <LoadingButton isLooading={isPending}>{t('button')}</LoadingButton>
        <div className=" text-2 flex-center">
          <p className="text-muted-200">{t('sign_up_question')}</p>
          <Link className="ml-2 text-primary" href={URL_SIGN_UP}>
            {t('link')}
          </Link>
        </div>
      </form>
    </Form>
  );
};
