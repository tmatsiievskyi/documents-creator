/* eslint-disable no-unused-vars */
'use client';

import { useLocale, useTranslations } from 'next-intl';
import { LngSelector } from './lng-selector.component';
import {
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@/ui';
import { appLocales, usePathname, useRouter } from '@/lib/i18n';
import { useTransition } from 'react';
import { useParams } from 'next/navigation';

export const WithLngSelector = () => {
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const t = useTranslations('lng-selector');
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const onSelectChange = (lngItem: string) => {
    startTransition(() => {
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      router.replace({ pathname, params }, { locale: lngItem });
    });
  };

  return (
    <LngSelector>
      <DropdownMenuContent className="mt-2">
        <DropdownMenuLabel>{t('title')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {appLocales.map(locale => (
          <DropdownMenuItem onClick={() => onSelectChange(locale)} key={locale}>
            {t(locale)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </LngSelector>
  );
};
