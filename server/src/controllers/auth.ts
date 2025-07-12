import { Router } from 'express';
import { Request, Response } from 'express-serve-static-core';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

import { rateLimit } from '../middlewares/rateLimitMiddleware';
import { validateLogin, validateSignup } from '../middlewares/authMiddleware';
import { generateToken, verifyToken } from '../utils/jwt';
import { cookieOptions } from '../config/cookieOptions';

import authService from '../services/authService';
import authErrorServer from '../utils/authErrorServer';

import { RequestLoginT } from '../types/request/RequestLoginT';
import { RequestSignupT } from '../types/request/RequestSignupT';

import { AuthUserT } from '../types/response/AuthUserT';
import { FailedAuthUserT } from '../types/response/FailedAuthUserT';

const accessCookie = process.env.ACCESS_TOKEN_COOKIE as string;
const refreshCookie = process.env.REFRESH_TOKEN_COOKIE as string;

const access = process.env.JWT_ACCESS_SECRET as string;
const refresh = process.env.JWT_REFRESH_SECRET as string;

const authController = Router();

authController.post('/login', rateLimit(10), validateLogin, async (
  req: RequestLoginT,
  res: Response<AuthUserT | FailedAuthUserT>
) => {
  const formData = req.user;

  try {
    const data = await authService.login(formData);

    const accessToken = generateToken(data.userData, access, 15);
    const refreshToken = generateToken(data.userData, refresh, 10080);

    res.cookie(accessCookie, accessToken, {
      ...cookieOptions,
      maxAge: 1000 * 60 * 15,
    });
    res.cookie(refreshCookie, refreshToken, {
      ...cookieOptions,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true
    });

    res.status(200).json(data);
  } catch (err: unknown) {
    const error = authErrorServer(err, 401);

    res.status(error.code).json(error);
  }
});

authController.post('/register', rateLimit(4), validateSignup, async (
  req: RequestSignupT,
  res: Response<AuthUserT | FailedAuthUserT>
) => {
  const formData = req.user;

  try {
    const data = await authService.register(formData);

    const accessToken = generateToken(data.userData, access, 15);
    const refreshToken = generateToken(data.userData, refresh, 10080);

    res.cookie(accessCookie, accessToken, {
      ...cookieOptions,
      maxAge: 1000 * 60 * 15,
    });
    res.cookie(refreshCookie, refreshToken, {
      ...cookieOptions,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true
    });

    res.status(200).json(data);
  } catch (err) {
    const error = authErrorServer(err, 409);

    res.status(error.code).json(error);
  }
});

authController.get('/logout', (
  req: Request,
  res: Response
) => {
  res.clearCookie(accessCookie, { ...cookieOptions, path: '/' });
  res.clearCookie(refreshCookie, { ...cookieOptions, path: '/' });

  res.status(200).json({ message: 'Successful logout' });
});

authController.post('/refresh', (
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

export default authController;
