import { Router } from 'express';
import { Request, Response } from 'express-serve-static-core';
import { ValidationError } from 'yup';

import { RegisterUserInterface } from '../interfaces/request/RegisterUserInterface';
import { LoginUserInterface } from '../interfaces/request/LoginUserInterface';

import { AuthUserI } from '../interfaces/response/AuthUserI';
import { FailedQueryI } from '../interfaces/response/FailedQueryI';

import authService from '../services/authService';

const authController = Router();

interface SessionUser {
  user?: AuthUserI
}

authController.post('/login', async (
  req: Request<{}, {}, LoginUserInterface>,
  res: Response<AuthUserI>
) => {
  const formData = req.body;

  try {
    const userData = await authService.login(formData);

    console.log(userData)
    console.log('Form is good')

    res.json(userData);
    res.status(200).send();
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
  req: Request<{}, {}, RegisterUserInterface>,
  res: Response<AuthUserI | FailedQueryI>
) => {
  const formData = req.body;

  try {
    const userData = await authService.register(formData);

    if ('id' in userData && 'username' in userData) {
      (req.session as SessionUser).user = {
        id: userData.id,
        username: userData.username
      };
    }
    res.json(userData);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message)
    } else if (err instanceof ValidationError) {
      console.log(err.errors)
    } else {
      console.log('Unknown error')
    }
  }
});

export default authController;
