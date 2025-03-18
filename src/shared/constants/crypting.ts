export const SALT_LENGTH = 32;
export const HASH_KEY_LENGTH = 64;
export const SALT_DEVIDER = '.';
export const HASH_ENCODING = 'hex';

export const SESSION_RANDOM_LENGTH = 20;
export const SESSION_DURATION = 1000 * 60 * 60 * 24 * 30;
export const SESSION_REFRESH_INTERVAL = SESSION_DURATION / 2;
export const SESSION_AUTH_COOKIE_NAME = 'doc_auth_session';
