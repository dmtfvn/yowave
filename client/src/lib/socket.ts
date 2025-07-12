import { io, Socket } from 'socket.io-client';
import Cookie from 'js-cookie';

import { ServerToClientT } from '../types/socket-events/ServerToClientT';
import { ClientToServerT } from '../types/socket-events/ClientToServerT';

import { baseUrl } from '../utils/consts';

const socket: Socket<ServerToClientT, ClientToServerT> = io(baseUrl, {
  autoConnect: false,
  withCredentials: true,
  auth: (callback) => {
    const token = Cookie.get('accessToken');

    if (token) {
      callback({ token });
    }
  }
});

export default socket;
