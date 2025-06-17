import { Request } from 'express-serve-static-core';

export interface RequestSignupT extends Request {
  user: {
    username: string;
    email: string;
    password: string;
  };
}
