import { Socket } from 'socket.io';

export type RequestSocketT = {
  socket: Socket;
  data: string;
  callback: (errMessage: string) => void;
};
