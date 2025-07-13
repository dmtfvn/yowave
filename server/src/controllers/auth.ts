import { Router } from 'express';
import { Request, Response } from 'express-serve-static-core';

import { rateLimit } from '../middlewares/rateLimitMiddleware';
import { validateLogin, validateSignup } from '../middlewares/authMiddleware';
import { generateToken } from '../utils/jwt';
import { clearJwtCookies, setJwtCookies } from '../utils/manageJwtCookies';
import { d7, m15 } from '../config/tokenDurations';

import authService from '../services/authService';
import authErrorServer from '../utils/authErrorServer';
import renewJwtAccess from '../utils/renewJwtAccess';

import { RequestLoginT } from '../types/request/RequestLoginT';
import { RequestSignupT } from '../types/request/RequestSignupT';

import { AuthUserT } from '../types/response/AuthUserT';
import { FailedAuthUserT } from '../types/response/FailedAuthUserT';

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

    const accessToken = generateToken(data.userData, access, m15);
    const refreshToken = generateToken(data.userData, refresh, d7);

    setJwtCookies(res, accessToken, refreshToken);

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

    const accessToken = generateToken(data.userData, access, m15);
    const refreshToken = generateToken(data.userData, refresh, d7);

    setJwtCookies(res, accessToken, refreshToken);

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
  clearJwtCookies(res);

  res.status(200).json({ message: 'Successful logout' });
});

authController.post('/refresh', (
  req: Request,
  res: Response
) => {
  return renewJwtAccess(req, res);
});

export default authController;
