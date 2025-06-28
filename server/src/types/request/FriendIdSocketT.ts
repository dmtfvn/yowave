import { Socket } from 'socket.io';

export type FriendIdSocketT = {
  socket: Socket;
  id: string;
  callback: (res: string) => void;
};
