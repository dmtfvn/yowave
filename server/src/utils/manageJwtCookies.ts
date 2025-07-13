import { Response } from 'express-serve-static-core';

import { cookieOptions } from '../config/cookieOptions';

const accessCookie = process.env.ACCESS_TOKEN_COOKIE as string;
const refreshCookie = process.env.REFRESH_TOKEN_COOKIE as string;

export function setJwtCookies(
  res: Response,
  accessToken: string,
  refreshToken: string
) {
  res.cookie(accessCookie, accessToken, {
    ...cookieOptions,
    maxAge: 1000 * 60 * 15
  });

  res.cookie(refreshCookie, refreshToken, {
    ...cookieOptions,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  });
}

export function clearJwtCookies(
  res: Response
) {
  res.clearCookie(accessCookie, { ...cookieOptions, path: '/' });
  res.clearCookie(refreshCookie, { ...cookieOptions, path: '/' });
}
