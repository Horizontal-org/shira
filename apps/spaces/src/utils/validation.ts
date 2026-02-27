const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isEmailValid = (value: string): boolean =>
  EMAIL_REGEX.test(value.trim());

export const hasRequiredValue = (value: string): boolean =>
  value.trim().length > 0;
