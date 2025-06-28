import { FriendSocketT } from '../../types/request/FriendSocketT';

import getSessionUserData from '../getSessionUserData';
import { redisClient } from '../../lib/resid';

import parseFriendListRedis from './parseFriendListRedis';

export default async function addFriendRedis({
  socket,
  data,
  callback
}: FriendSocketT): Promise<void> {
  const userData = getSessionUserData(socket);

  const username = userData.username;

  if (!username || username === data) {
    return;
  }

  const friendId = await redisClient.hGet(
    `userid:${data}`, 'id'
  );

  if (!friendId) {
    callback('Invalid friend name', []);
    return;
  }

  const friendList = await redisClient.lRange(
    `friends:${username}`, 0, -1
  );

  if (friendList && friendList.indexOf(`${data}:${friendId}`) !== -1) {
    callback('Friend already added', []);
    return;
  }

  await redisClient.lPush(
    `friends:${username}`, [data, friendId].join(':')
  );

  const curFriendList = await redisClient.lRange(
    `friends:${username}`, 0, -1
  );

  const parseFriendList = await parseFriendListRedis(curFriendList);

  callback('', parseFriendList);
}
