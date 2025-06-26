import { redisClient } from '../../lib/resid';

import { FriendT } from '../../types/friend/FriendT';

export default async function parseFriendListRedis(friendList: string[]): Promise<FriendT[]> {
  const newFriendList: FriendT[] = [];

  for (const data of friendList) {
    const friend = data.split(':');

    const friendStatus = await redisClient.hGet(
      `userid:${friend[0]}`, 'online'
    );

    newFriendList.push({
      id: friend[1],
      username: friend[0],
      online: Boolean(friendStatus === 'true'),
    });
  }

  return newFriendList;
}
