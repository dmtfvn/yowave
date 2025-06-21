import { io, Socket } from 'socket.io-client';

import { ServerToClientT } from '../types/socket-events/ServerToClientT';
import { ClientToServerT } from '../types/socket-events/ClientToServerT';

import { baseUrl } from '../utils/consts';

const socket: Socket<ServerToClientT, ClientToServerT> = io(baseUrl, {
  autoConnect: false,
  withCredentials: true,
});

export default socket;
