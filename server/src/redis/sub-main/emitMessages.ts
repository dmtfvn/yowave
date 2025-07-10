import { Socket } from 'socket.io';

import { redisClient } from '../../lib/redis';

export default async function emitMessages(
  socket: Socket,
  userid: string
) {
  const chatData = await redisClient.lRange(
    `chat:${userid}`, 0, -1
  );

  if (chatData.length) {
    const msgData = chatData.map(d => {
      const data = d.split('<{~}>');

      return {
        to: data[0],
        from: data[1],
        id: data[2],
        content: data[3]
      };
    });

    socket.emit('messages', msgData);
  }
}
