import { Router } from 'express';
import { Request, Response } from 'express-serve-static-core';

import { LoginUserT } from '../interfaces/request/LoginUserT';
import { SignupUserT } from '../interfaces/request/SignupUserT';

import { AuthUserT } from '../interfaces/response/AuthUserT';
import { FailedQueryT } from '../interfaces/response/FailedQueryT';
import { SessionUserT } from '../interfaces/session/SessionUserT';

import authService from '../services/authService';
import authErrorHandler from '../utils/authErrorHandler';

const authController = Router();

authController.post('/login', async (
  req: Request<{}, {}, LoginUserT>,
  res: Response<AuthUserT | FailedQueryT>
) => {
  const formData = req.body;

  try {
    const userData = await authService.login(formData);

    (req.session as SessionUserT).user = userData;

    res.status(200).json(userData);
  } catch (err: unknown) {
    const { code, body } = authErrorHandler(err, 401);

    res.status(code).json(body);
  }
});

authController.post('/register', async (
  req: Request<{}, {}, SignupUserT>,
  res: Response<AuthUserT | FailedQueryT>
) => {
  const formData = req.body;

  try {
    const userData = await authService.register(formData);

    (req.session as SessionUserT).user = userData;

    res.status(200).json(userData);
  } catch (err) {
    const { code, body } = authErrorHandler(err, 409);

    res.status(code).json(body);
  }
});

export default authController;
