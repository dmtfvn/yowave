import { Socket } from 'socket.io';

import { FriendT } from '../friend/FriendT';

export type RequestSocketT = {
  socket: Socket;
  data: string;
  callback: (errMessage: string, res: FriendT[]) => void;
};
