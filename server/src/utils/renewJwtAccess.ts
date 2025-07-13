import { Request, Response } from 'express-serve-static-core';

import { generateToken, verifyToken } from './jwt';
import { cookieOptions } from '../config/cookieOptions';
import { clearJwtCookies } from './manageJwtCookies';
import { m15 } from '../config/tokenDurations';

import handleJwtError from './handleJwtError';

const accessCookie = process.env.ACCESS_TOKEN_COOKIE as string;
const refreshCookie = process.env.REFRESH_TOKEN_COOKIE as string;

const access = process.env.JWT_ACCESS_SECRET as string;
const refresh = process.env.JWT_REFRESH_SECRET as string;

export default function renewJwtAccess(
  req: Request,
  res: Response
) {
  const refreshToken: string = req.cookies[refreshCookie];

  if (!refreshToken) {
    res.status(401).json({ message: 'Missing refresh token' });
    return;
  }

  try {
    const tokenData = verifyToken(refreshToken, refresh);

    const accessToken = generateToken(tokenData.userData, access, m15);

    res.cookie(accessCookie, accessToken, {
      ...cookieOptions,
      maxAge: 1000 * 60 * 15
    });

    res.status(200).json(tokenData);
    return;
  } catch (err: unknown) {
    clearJwtCookies(res);

    res.status(401).json(handleJwtError(err));
    return;
  }
}
