import { Socket } from 'socket.io';

import { DirectMsgT } from '../../types/friend/DirectMsgT';
import { redisClient } from '../../lib/redis';

export default async function dmFriendRedis(socket: Socket, data: DirectMsgT) {
  const message = [data.to, data.from, data.id, data.content].join('<{~}>');

  await redisClient.lPush(
    `chat:${data.to}`, message
  );

  await redisClient.lPush(
    `chat:${data.from}`, message
  );

  socket.to(data.to).emit('msg', data);
}
