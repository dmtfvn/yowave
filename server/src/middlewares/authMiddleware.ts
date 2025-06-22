import { NextFunction } from 'express-serve-static-core';
import { ObjectSchema, ValidationError } from 'yup';

import { LoginFormValues, loginSchema } from '../schemas/loginSchema';
import { SignupFormValues, signupSchema } from '../schemas/signupSchema';

import { RequestValidationT } from '../types/request/RequestValidationT';
import { ResponseValidationT } from '../types/response/ResponseValidationT';

const validateSchema = (schema: ObjectSchema<LoginFormValues | SignupFormValues>) => {
  return async (
    req: RequestValidationT,
    res: ResponseValidationT,
    next: NextFunction
  ) => {
    try {
      const validatedUser = await schema.validate(req.body, {
        abortEarly: false,
      });

      req.user = validatedUser;

      next();
    } catch (err: unknown) {
      if (err instanceof ValidationError) {
        res.status(400).json({ message: 'Validation failed', errors: err.errors });
      } else if (err instanceof Error) {
        next(err);
      }
    }
  }
}

export const validateLogin = validateSchema(loginSchema);
export const validateSignup = validateSchema(signupSchema);
