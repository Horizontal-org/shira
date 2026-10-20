import { CookieOptions } from 'express';

export const authCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  domain: process.env.COOKIE_DOMAIN,
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
});
