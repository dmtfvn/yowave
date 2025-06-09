import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import helmet from 'helmet';
import cors from 'cors';

import routes from './routes';

const app = express();
const port: number = 3000;
const httpServer = createServer(app);

const corsOptions = {
  origin: 'http://localhost:5173',//.env
  credentials: true,
};

app.use(cors(corsOptions));

const io = new Server(httpServer, {
  cors: corsOptions,
});

app.use(helmet());
app.use(express.json());
app.use(routes);

io.on('connection', (socket) => {

});

httpServer.listen(port, (): void => {
  console.log(`Server is listening on http://localhost:${port}...`);
});
