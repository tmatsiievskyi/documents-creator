import Negotiator from 'negotiator';
import { NextRequest } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import { defineRouting } from 'next-intl/routing';

export const appLocales = ['en', 'ua'];

export const appDefaultLocale = 'en';

export const localeRouting = defineRouting({
  locales: appLocales,
  defaultLocale: appDefaultLocale,
});

export const getLocaleFromReq = (req: NextRequest) => {
  const localeCookie = req.cookies.get('NEXT_LOCALE')?.value;
  if (localeCookie && appLocales.includes(localeCookie)) {
    return localeCookie;
  }

  const negotiatorHeaders: Record<string, string> = {};
  const acceptLanguage = req.headers.get('accept-language');

  if (acceptLanguage) {
    negotiatorHeaders['accept-language'] = acceptLanguage;
    const negotiator = new Negotiator({ headers: negotiatorHeaders });
    const languages = negotiator.languages();
    return match(languages, appLocales, appDefaultLocale);
  }

  return appDefaultLocale;
};
