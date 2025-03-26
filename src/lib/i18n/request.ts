import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { localeRouting } from './helper.i18n';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;

  const locale = hasLocale(localeRouting.locales, requested)
    ? requested
    : localeRouting.defaultLocale;

  return {
    locale,
    messages: (await import(`../../../localization/${locale}.json`)).default,
  };
});
