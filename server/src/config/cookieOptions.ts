import { CookieOptionsT } from '../types/cookie/CookieOptionsT';

export const cookieOptions: CookieOptionsT = {
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
};
