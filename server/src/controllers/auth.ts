import { Router } from 'express';
import { Request, Response } from 'express-serve-static-core';

import { rateLimit } from '../middlewares/rateLimitMiddleware';
import { validateLogin, validateSignup } from '../middlewares/authMiddleware';
import { generateToken } from '../utils/jwt';

import authService from '../services/authService';
import authErrorHandler from '../utils/auth/authErrorHandler';

import { RequestLoginT } from '../types/request/RequestLoginT';
import { RequestSignupT } from '../types/request/RequestSignupT';

import { AuthUserT } from '../types/response/AuthUserT';
import { FailedQueryT } from '../types/response/FailedQueryT';

const cookieName = process.env.AUTH_COOKIE as string;

const authController = Router();

authController.post('/login', rateLimit(10), validateLogin, async (
  req: RequestLoginT,
  res: Response<AuthUserT | FailedQueryT>
) => {
  const formData = req.user;

  try {
    const data = await authService.login(formData);

    const token = generateToken(data.userData);

    res.cookie(cookieName, token, {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });

    res.status(200).json(data);
  } catch (err: unknown) {
    const { code, body } = authErrorHandler(err, 401);

    res.status(code).json(body);
  }
});

authController.post('/register', rateLimit(4), validateSignup, async (
  req: RequestSignupT,
  res: Response<AuthUserT | FailedQueryT>
) => {
  const formData = req.user;

  try {
    const data = await authService.register(formData);

    const token = generateToken(data.userData);

    res.cookie(cookieName, token, {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });

    res.status(200).json(data);
  } catch (err) {
    const { code, body } = authErrorHandler(err, 409);

    res.status(code).json(body);
  }
});

authController.get('/logout', (
  req: Request,
  res: Response
) => {
  if (cookieName) {
    res.clearCookie(cookieName, {
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });
  }

  res.status(200).json({ message: 'Successful logout' });
});

export default authController;
