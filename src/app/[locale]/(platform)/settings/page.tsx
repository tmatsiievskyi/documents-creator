import { redirect } from '@/lib/i18n';
import { URL_SETTINGS_PROFILE } from '@/shared/constants';
import { getLocale } from 'next-intl/server';

const SettingsPage = async () => {
  const locale = await getLocale();
  return redirect({ href: URL_SETTINGS_PROFILE, locale });
};

export default SettingsPage;
