import { Socket } from 'socket.io';

export default function emitStoreError(
  socket: Socket,
  err: unknown
) {
  if (err instanceof Error) {
    socket.emit('store_error', `Error: ${err.message}`);
  } else {
    socket.emit('store_error', 'Error: Redis store error');
  }
}
