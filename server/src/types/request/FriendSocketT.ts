import { Socket } from 'socket.io';

import { FriendT } from '../friend/FriendT';

export type FriendSocketT = {
  socket: Socket;
  name: string;
  callback: (errMessage: string, res: FriendT[]) => void;
};
