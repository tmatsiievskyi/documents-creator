import {
  URL_SETTING_COMPANY_BILLINGS,
  URL_SETTING_COMPANY_INFO,
  URL_SETTING_COMPANY_MEMBERS,
  URL_SETTINGS_COMPANY_CREATE,
  URL_SETTINGS_PROFILE,
} from '@/shared/constants';

export const settingsItemsData = [
  {
    name: 'user',
    type: 'static',
    shouldHaveCompany: false,
    items: [
      {
        name: 'profile',
        href: URL_SETTINGS_PROFILE,
      },
    ],
  },
  {
    name: 'company',
    type: 'dynamic',
    shouldHaveCompany: false,
    items: [
      {
        name: 'create_company',
        href: URL_SETTINGS_COMPANY_CREATE,
      },
    ],
  },
  {
    name: 'company',
    type: 'dynamic',
    shouldHaveCompany: true,
    items: [
      {
        name: 'company_info',
        href: (companyId: string) => URL_SETTING_COMPANY_INFO(companyId),
      },
      {
        name: 'company_billings',
        href: (companyId: string) => URL_SETTING_COMPANY_BILLINGS(companyId),
      },
      {
        name: 'company_members',
        href: (companyId: string) => URL_SETTING_COMPANY_MEMBERS(companyId),
      },
    ],
  },
];
