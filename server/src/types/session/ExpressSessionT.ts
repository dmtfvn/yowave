import { ServerResponse } from 'http';
import { ExtendedError } from 'socket.io';

import { RequestSessionT } from '../request/RequestSessionT';

export type ExpressSessionT = (
  req: RequestSessionT,
  res: ServerResponse,
  next: (err?: ExtendedError | undefined) => void
) => void;
