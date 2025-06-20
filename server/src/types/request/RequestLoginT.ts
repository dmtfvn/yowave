import { Request } from 'express-serve-static-core';

export type RequestLoginT = Request & {
  user: {
    email: string;
    password: string;
  };
};
