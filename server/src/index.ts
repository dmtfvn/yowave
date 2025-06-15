import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import helmet from 'helmet';
import cors from 'cors';
import session from 'express-session';

import 'dotenv/config';

import routes from './routes';

const app = express();
const port: number = 3000;
const httpServer = createServer(app);

const corsOptions = {
  origin: process.env.CLIENT_URL as string,
  credentials: true,
};

const io = new Server(httpServer, {
  cors: corsOptions,
});

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(session({
  secret: process.env.COOKIE_SECRET as string,
  name: process.env.AUTH_COOKIE as string,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.ENVIRONMENT === 'production',
    httpOnly: true,
    sameSite: process.env.ENVIRONMENT === 'production' ? 'none' : 'lax',
  }
}));
app.use(routes);

io.on('connection', (socket) => {

});

httpServer.listen(port, (): void => {
  console.log(`Server is listening on http://localhost:${port}...`);
});
