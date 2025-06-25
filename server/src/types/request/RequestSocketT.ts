import { Socket } from 'socket.io';

import { FriendT } from '../../utils/parseFriendListRedis';

export type RequestSocketT = {
  socket: Socket;
  data: string;
  callback: (errMessage: string, res: FriendT[]) => void;
};
