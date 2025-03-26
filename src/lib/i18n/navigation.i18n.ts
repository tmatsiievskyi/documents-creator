import { createNavigation } from 'next-intl/navigation';
import { localeRouting } from './helper.i18n';

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(localeRouting);
