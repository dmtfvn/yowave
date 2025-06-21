import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import helmet from 'helmet';
import cors from 'cors';
import {
  corsOptions,
  expressSession,
  wrapSession
} from './middlewares/sessionMiddleware';
import authorizeUser from './middlewares/authUserMiddleware';

import { RequestSessionT } from './types/request/RequestSessionT';

import routes from './routes';

const app = express();
const port: number = 3000;
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: corsOptions,
});

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(expressSession);
app.use(routes);

io.use(wrapSession(expressSession));
io.use(authorizeUser);
io.on('connection', (socket) => {
  const req = socket.request as RequestSessionT;

  console.log('Session:', req.session?.user?.userData.username)
  console.log('Socket id:', socket.id)
});

httpServer.listen(port, (): void => {
  console.log(`Server is listening on http://localhost:${port}...`);
});
