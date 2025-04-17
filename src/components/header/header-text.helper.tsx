'use client';

import { usePathname } from '@/lib/i18n';
import { URL_SETTINGS_PROFILE } from '@/shared/constants';
import { useTranslations } from 'next-intl';

export const HeaderTextHelper = () => {
  const pathname = usePathname();
  const t = useTranslations('header.sections');

  const settingsSectionRegExp = (section: string) => {
    const escapedSection = section.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regStr = `^/settings/company/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/${escapedSection}$`;

    return new RegExp(regStr);
  };

  if (pathname.includes(URL_SETTINGS_PROFILE)) {
    return <span>{t('your_profile')}</span>;
  }

  if (settingsSectionRegExp('info').test(pathname)) {
    return <span>{t('company_info')}</span>;
  }

  if (settingsSectionRegExp('billings').test(pathname)) {
    return <span>{t('company_billings')}</span>;
  }

  if (settingsSectionRegExp('members').test(pathname)) {
    return <span>{t('company_members')}</span>;
  }

  return null;
};
