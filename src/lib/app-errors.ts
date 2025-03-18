import { AUTHENTICATION_ERROR_MESSAGE } from '@/shared/constants';

export class PublicError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class RateLimitError extends Error {
  constructor() {
    super('Rate limit exceeded');
    this.name = 'RateLimitError';
  }
}

export const AuthError = class AuthenticationError extends Error {
  constructor() {
    super(AUTHENTICATION_ERROR_MESSAGE); // TODO: localization
    this.name = 'AuthenticationError';
  }
};
