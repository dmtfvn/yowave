import { redisClient } from '../lib/resid';

import { RequestSocketT } from '../types/request/RequestSocketT';
import { AuthorizedUserT } from '../types/request/AuthorizedUserT';

export default async function getUserRedis({
  socket,
  data,
  callback
}: RequestSocketT): Promise<void> {
  const req = socket.request as AuthorizedUserT;
  const username = req.session?.user?.userData.username;

  if (!username || username === data) {
    return;
  }

  const friendList = await redisClient.lRange(
    `friends:${username}`, 0, -1
  );

  if (friendList && friendList.indexOf(data) !== -1) {
    console.log('Friend already added')
    return;
  }

  const friendId = await redisClient.hGet(
    `userid:${data}`, 'id'
  );

  if (!friendId) {
    callback('Invalid friend');
    return;
  }

  await redisClient.lPush(`friends:${username}`, data);
}
