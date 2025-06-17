import { Router } from 'express';
import { Request, Response } from 'express-serve-static-core';
import 'dotenv/config';

import { RequestLoginT } from '../interfaces/request/RequestLoginT';
import { RequestSignupT } from '../interfaces/request/RequestSignupT';

import { AuthUserT } from '../interfaces/response/AuthUserT';
import { FailedQueryT } from '../interfaces/response/FailedQueryT';
import { SessionUserT } from '../interfaces/session/SessionUserT';

import { accessControl } from '../middlewares/rateLimit';
import { validateLogin, validateSignup } from '../middlewares/authMiddleware';

import authService from '../services/authService';
import authErrorHandler from '../utils/authErrorHandler';

const authController = Router();

authController.post('/login', accessControl(10), validateLogin, async (
  req: RequestLoginT,
  res: Response<AuthUserT | FailedQueryT>
) => {
  const formData = req.user;

  try {
    const userData = await authService.login(formData);

    (req.session as SessionUserT).user = userData;

    res.status(200).json(userData);
  } catch (err: unknown) {
    const { code, body } = authErrorHandler(err, 401);

    res.status(code).json(body);
  }
});

authController.post('/register', accessControl(2), validateSignup, async (
  req: RequestSignupT,
  res: Response<AuthUserT | FailedQueryT>
) => {
  const formData = req.user;

  try {
    const userData = await authService.register(formData);

    (req.session as SessionUserT).user = userData;

    res.status(200).json(userData);
  } catch (err) {
    const { code, body } = authErrorHandler(err, 409);

    res.status(code).json(body);
  }
});

authController.get('/logout', (
  req: Request,
  res: Response
) => {
  const cookieName = process.env.AUTH_COOKIE;

  if (cookieName) {
    res.clearCookie(cookieName, {
      path: '/',
      secure: process.env.ENVIRONMENT === 'production',
      httpOnly: true,
      sameSite: process.env.ENVIRONMENT === 'production' ? 'none' : 'lax',
    });
  }

  res.status(204).send();
});

export default authController;
