import { redisClient } from '../lib/resid';

import { RequestSocketT } from '../types/request/RequestSocketT';
import getSessionUserData from './getSessionUserData';

import parseFriendListRedis from './parseFriendListRedis';

export default async function getUserRedis({
  socket,
  data,
  callback
}: RequestSocketT): Promise<void> {
  const userData = getSessionUserData(socket);

  const username = userData.username;

  if (!username || username === data) {
    return;
  }

  const friendList = await redisClient.lRange(
    `friends:${username}`, 0, -1
  );

  if (friendList && friendList.indexOf(data) !== -1) {
    callback('Friend already added', []);
    return;
  }

  const friendId = await redisClient.hGet(
    `userid:${data}`, 'id'
  );

  if (!friendId) {
    callback('Invalid friend name', []);
    return;
  }

  await redisClient.lPush(
    `friends:${username}`, [data, friendId].join('.')
  );

  const curFriendList = await redisClient.lRange(
    `friends:${username}`, 0, -1
  );

  const parseFriendList = await parseFriendListRedis(curFriendList)
  console.log('Parsed list', parseFriendList)

  callback('', parseFriendList);
}
