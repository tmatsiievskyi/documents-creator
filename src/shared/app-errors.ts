import { AUTHENTICATION_ERROR_MESSAGE, LOGIN_ERROR_MESSAGE } from '@/shared/constants';

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

export class AuthError extends Error {
  constructor() {
    super(AUTHENTICATION_ERROR_MESSAGE);
    this.name = 'AuthenticationError';
  }
}

export class LoginError extends Error {
  constructor() {
    super(LOGIN_ERROR_MESSAGE);
    this.name = 'LoginError';
  }
}

export class NotFoundError extends PublicError {
  constructor(message?: string) {
    super(message || 'Resource not found');
    this.name = 'NotFoundError';
  }
}
