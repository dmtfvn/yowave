import { Router } from 'express';
import { Request, Response } from 'express-serve-static-core';

import { rateLimit } from '../middlewares/rateLimitMiddleware';
import { validateLogin, validateSignup } from '../middlewares/authMiddleware';
import { generateToken } from '../utils/jwt';
import { cookieOptions } from '../config/cookieOptions';

import authService from '../services/authService';
import authErrorServer from '../utils/authErrorServer';

import { RequestLoginT } from '../types/request/RequestLoginT';
import { RequestSignupT } from '../types/request/RequestSignupT';

import { AuthUserT } from '../types/response/AuthUserT';
import { FailedAuthUserT } from '../types/response/FailedAuthUserT';

const cookieName = process.env.AUTH_COOKIE as string;

const authController = Router();

authController.post('/login', rateLimit(10), validateLogin, async (
  req: RequestLoginT,
  res: Response<AuthUserT | FailedAuthUserT>
) => {
  const formData = req.user;

  try {
    const data = await authService.login(formData);

    const token = generateToken(data.userData);

    res.cookie(cookieName, token, cookieOptions);

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

    const token = generateToken(data.userData);

    res.cookie(cookieName, token, cookieOptions);

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
  res.clearCookie(cookieName, { ...cookieOptions, path: '/' });

  res.status(200).json({ message: 'Successful logout' });
});

export default authController;
