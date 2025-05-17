import { env } from '@/lib/env';

// ---AUTH---
export const URL_AFTER_LOGIN = '/dashboard';
export const URL_MAGIC_SIGN_IN = '/auth/sign-in/magic';
export const URL_MAGIC_ERROR = '/auth/sign-in/magic/error';
export const URL_SIGN_IN = '/auth/sign-in';
export const URL_SIGN_OUT = '/auth/sign-out';
export const API_SIGN_OUT = '/api/sign-out';
export const URL_SIGN_IN_EMAIL = '/auth/sign-in/email';
export const URL_SIGN_UP = '/auth/sign-up';
export const URL_SIGN_UP_EMAIL = '/auth/sign-up/email';
export const API_GOOGLE_CALLBACK = (hostName: string) => `${hostName}/api/sign-in/google/callback`;
// ---DASHBOARD---
export const URL_DASHBOARD = '/dashboard';
export const URL_CREATE_DOCUMENT = `${URL_DASHBOARD}/create-document`;
export const URL_DASHBOARD_DOCUMENTS = `${URL_DASHBOARD}/documents`;
export const URL_DASHBOARD_TEMPLATES = `${URL_DASHBOARD}/templates`;
export const URL_DASHBOARD_FEATURES = `${URL_DASHBOARD}/features`;
export const URL_DASHBOARD_VARIABLES = `${URL_DASHBOARD}/variables`;

// ---MISC---
export const INSIDE_APP_ROUTES = ['dashboard', 'settings', 'companies', 'account'];

// ---SETTINGS---
export const URL_SETTINGS = '/settings';
export const URL_SETTINGS_PROFILE = `${URL_SETTINGS}/profile`;
export const URL_SETTINGS_COMPANY_CREATE = `${URL_SETTINGS}/company/create`;
export const URL_SETTING_COMPANY_INFO = (companyId: string) =>
  `${URL_SETTINGS}/company/${companyId}/info`;
export const URL_SETTING_COMPANY_INFO_EDIT = (companyId: string) =>
  `${URL_SETTINGS}/company/${companyId}/info/edit`;
export const URL_SETTING_COMPANY_BILLINGS = (companyId: string) =>
  `${URL_SETTINGS}/company/${companyId}/billings`;
export const URL_SETTING_COMPANY_MEMBERS = (companyId: string) =>
  `${URL_SETTINGS}/company/${companyId}/members`;

// ---FILES---
// getCompanyImageKey
export const KEY_COMPANY_IMAGE = (companyId: string, imageId: string) => {
  return `companies/${companyId}/images/${imageId}`;
};
export const URL_COMPANY_IMAGE = (companyId: string, companyImageId: string) => {
  return `/api/companies/${companyId}/images/${companyImageId}`;
};

// ---USER---
export const API_USER_PROFILE_IMAGE = (userId: string, imageId: string) => {
  return `${env.HOST_NAME}/api/users/${userId}/images/${imageId}`;
};
