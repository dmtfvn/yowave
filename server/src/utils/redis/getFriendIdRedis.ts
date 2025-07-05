import { Socket } from 'socket.io';

import getCookieUserData from '../getCookieUserData';
import { redisClient } from '../../lib/redis';

export default async function getFriendIdRedis(socket: Socket) {
  const userData = getCookieUserData(socket);

  const username = userData.username;

  try {
    const friendId = await redisClient.hGet(
      `userid:${username}`, 'friendId'
    );

    if (friendId) {
      socket.emit('getFriendId', friendId);
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      socket.emit('getFriendId', `Error: ${err.message}`);
    } else {
      socket.emit('getFriendId', 'Error: Unknown error');
    }
  }
}
