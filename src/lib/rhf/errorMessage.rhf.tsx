'use client';

import { PropsWithChildren } from 'react';
import { cn } from '../utils';
import { useTranslations } from 'next-intl';

type TProps = {
  className?: string;
  message?: string;
} & PropsWithChildren;
export const RHFErrorMessage = ({ message, className }: TProps) => {
  const t = useTranslations('validation');

  if (!message) return null;

  return (
    <p
      className={cn('text-xs text-left text-destructive block absolute bottom-[-10px] ', className)}
    >
      {t(`${message}`)}
    </p>
  );
};
