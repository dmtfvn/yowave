import session from 'express-session';
import { ServerResponse } from 'http';
import { ExtendedError, Socket } from 'socket.io';

import 'dotenv/config';

import { redisStore } from '../lib/resid';

import { ExpressSessionT } from '../types/session/ExpressSessionT';

export const corsOptions = {
  origin: process.env.CLIENT_URL as string,
  credentials: true,
};

export const expressSession = session({
  store: redisStore,
  secret: process.env.COOKIE_SECRET as string,
  name: process.env.AUTH_COOKIE as string,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  }
});

export const wrapSession = (session: ExpressSessionT) => {
  return (socket: Socket, next: (err?: ExtendedError | undefined) => void) => {
    const res = new ServerResponse(socket.request);

    session(socket.request, res, next);
  }
}
