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

import authorizeUser from './middlewares/socketMiddleware';

import setUserRedis from './utils/redis/setUserRedis';
import addFriendRedis from './utils/redis/addFriendRedis';
import clearUserRedis from './utils/redis/clearUserRedis';

import { FriendT } from './types/friend/FriendT';

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
  setUserRedis(socket);

  socket.on('reqData', (data: string, callback: (errMessage: string, res: FriendT[]) => void) => {
    addFriendRedis({ socket, data, callback });
  });

  socket.on('disconnecting', () => {
    clearUserRedis(socket);
  });
});

httpServer.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}...`);
});
