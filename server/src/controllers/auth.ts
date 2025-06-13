import { Router } from 'express';
import { Request, Response } from 'express-serve-static-core';
import { ValidationError } from 'yup';

import { LoginUserT } from '../interfaces/request/LoginUserT';
import { SignupUserT } from '../interfaces/request/SignupUserT';

import { AuthUserT } from '../interfaces/response/AuthUserT';
import { AuthErrorT } from '../interfaces/response/AuthErrorT';
import { FailedQueryT } from '../interfaces/response/FailedQueryT';
import { SessionUserT } from '../interfaces/session/SessionUserT';

import authService from '../services/authService';

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
    if (err instanceof Error && 'errorData' in err) {
      const authError = err as AuthErrorT;
      res.status(401).json(authError.errorData);
    } else if (err instanceof Error) {
      console.log(err.message)
    } else if (err instanceof ValidationError) {
      console.log(err.errors)
    } else {
      console.log('Unknown error')
    }

    res.status(422).send();
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
    if (err instanceof Error && 'errorData' in err) {
      const authError = err as AuthErrorT;
      res.status(409).json(authError.errorData);
    } else if (err instanceof Error) {
      console.log(err.message)
    } else if (err instanceof ValidationError) {
      console.log(err.errors)
    } else {
      console.log('Unknown error')
    }

    res.status(422).send();
  }
});

export default authController;
