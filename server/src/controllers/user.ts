import { Router } from 'express';
import { Request, Response } from 'express-serve-static-core';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

import { generateToken, verifyToken } from '../utils/jwt';
import { cookieOptions } from '../config/cookieOptions';

const accessCookie = process.env.ACCESS_TOKEN_COOKIE as string;
const refreshCookie = process.env.REFRESH_TOKEN_COOKIE as string;

const access = process.env.JWT_ACCESS_SECRET as string;
const refresh = process.env.JWT_REFRESH_SECRET as string;

const userController = Router();

userController.get('/user', async (
  req: Request,
  res: Response
) => {
  const refreshToken: string = req.cookies[refreshCookie];

  if (!refreshToken) {
    res.status(401).json({ message: 'Missing refresh token' });
    return;
  }

  try {
    const tokenData = verifyToken(refreshToken, refresh);

    const accessToken = generateToken(tokenData.userData, access, 15);

    res.cookie(accessCookie, accessToken, {
      ...cookieOptions,
      maxAge: 1000 * 60 * 15,
    });

    res.status(200).json(tokenData);
  } catch (err: unknown) {
    res.clearCookie(accessCookie, { ...cookieOptions, path: '/' });
    res.clearCookie(refreshCookie, { ...cookieOptions, path: '/' });

    if (err instanceof TokenExpiredError) {
      res.status(401).json({ message: 'Token has expired' });
    } else if (err instanceof JsonWebTokenError) {
      res.status(401).json({ message: 'Invalid token' });
    } else {
      res.status(401).json({ message: 'Token verification error' });
    }
  }
});

export default userController;
