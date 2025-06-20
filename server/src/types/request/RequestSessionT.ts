import { IncomingMessage } from 'http';
import { Session } from 'express-session';

import { AuthUserT } from '../response/AuthUserT';

export type RequestSessionT = IncomingMessage & {
  session?: Session & Partial<AuthUserT>;
};
