import { Request } from 'express-serve-static-core';

export type RequestSignupT = Request & {
  user: {
    username: string;
    email: string;
    password: string;
  };
};
