import { Request } from 'express-serve-static-core';

import { LoginFormValues } from '../../schemas/loginSchema';
import { SignupFormValues } from '../../schemas/signupSchema';

export type RequestValidationT = Request & {
  user?: LoginFormValues | SignupFormValues;
};
