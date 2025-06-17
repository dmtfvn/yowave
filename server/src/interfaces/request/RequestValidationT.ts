import { Request } from 'express-serve-static-core';

import { LoginFormValues } from '../../schemas/loginSchema';
import { SignupFormValues } from '../../schemas/signupSchema';

export interface RequestValidationT extends Request {
  user?: LoginFormValues | SignupFormValues;
}
