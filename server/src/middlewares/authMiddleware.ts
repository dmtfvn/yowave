import { NextFunction, Response } from 'express-serve-static-core';
import { ObjectSchema } from 'yup';

import { LoginFormValues, loginSchema } from '../schemas/loginSchema';
import { SignupFormValues, signupSchema } from '../schemas/signupSchema';

import { RequestValidationT } from '../types/request/RequestValidationT';

const validateSchema = (
  schema: ObjectSchema<LoginFormValues | SignupFormValues>
) => {
  return async (
    req: RequestValidationT,
    res: Response,
    next: NextFunction
  ) => {
    const validatedUser = await schema.validate(req.body, {
      abortEarly: false
    });
    req.user = validatedUser;

    next();
  }
}

export const validateLogin = validateSchema(loginSchema);
export const validateSignup = validateSchema(signupSchema);
