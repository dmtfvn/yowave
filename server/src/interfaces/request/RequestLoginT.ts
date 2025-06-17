import { Request } from 'express-serve-static-core';

export interface RequestLoginT extends Request {
  user: {
    email: string;
    password: string;
  };
}
