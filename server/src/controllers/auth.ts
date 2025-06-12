import { Router } from 'express';
import { Request, Response } from 'express-serve-static-core';
import { ValidationError } from 'yup';

import { LoginUserI } from '../interfaces/request/LoginUserI';
import { SignupUserI } from '../interfaces/request/SignupUserI';

import { AuthUserI } from '../interfaces/response/AuthUserI';
import { FailedQueryI } from '../interfaces/response/FailedQueryI';

import { SessionUserI } from '../interfaces/session/SessionUserI';

import authService from '../services/authService';

const authController = Router();

authController.post('/login', async (
  req: Request<{}, {}, LoginUserI>,
  res: Response<AuthUserI | FailedQueryI>
) => {
  const formData = req.body;

  try {
    const userData = await authService.login(formData);

    if ('id' in userData && 'username' in userData) {
      const conciseUser: AuthUserI = {
        id: userData.id,
        username: userData.username
      };

      (req.session as SessionUserI).user = conciseUser;

      res.status(200).json(conciseUser);
    } else {
      res.status(422).json(userData);
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
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
  req: Request<{}, {}, SignupUserI>,
  res: Response<AuthUserI | FailedQueryI>
) => {
  const formData = req.body;

  try {
    const userData = await authService.register(formData);

    if ('id' in userData && 'username' in userData) {
      (req.session as SessionUserI).user = {
        id: userData.id,
        username: userData.username
      };
    }

    res.status(200).json(userData);
  } catch (err) {
    if (err instanceof Error) {
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
