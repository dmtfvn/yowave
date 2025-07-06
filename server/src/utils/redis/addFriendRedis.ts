import { redisClient } from '../../lib/redis';
import parseFriendListRedis from './parseFriendListRedis';

import { FriendSocketT } from '../../types/request/FriendSocketT';
import { UserDataT } from '../../types/user/UserDataT';

export default async function addFriendRedis({
  socket,
  name,
  callback
}: FriendSocketT): Promise<void> {
  const userData: UserDataT = socket.data.userData;

  const username = userData.username;

  if (!username || username === name) {
    return;
  }

  const friendId = await redisClient.hGet(
    `userid:${name}`, 'id'
  );

  if (!friendId) {
    callback('Invalid friend name', []);
    return;
  }

  const friendList = await redisClient.lRange(
    `friends:${username}`, 0, -1
  );

  if (friendList && friendList.indexOf(`${name}:${friendId}`) !== -1) {
    callback('Friend already added', []);
    return;
  }

  await redisClient.lPush(
    `friends:${username}`, [name, friendId].join(':')
  );

  const curFriendList = await redisClient.lRange(
    `friends:${username}`, 0, -1
  );

  const parseFriendList = await parseFriendListRedis(curFriendList);

  callback('', parseFriendList);
}
