import { redisClient } from '../../lib/redis';

import { FriendT } from '../../types/friend/FriendT';

export default async function parseFriendList(
  friendList: string[]
): Promise<FriendT[]> {
  const newFriendList: FriendT[] = [];

  for (const data of friendList) {
    const friend = data.split(':');

    try {
      const friendStatus = await redisClient.hGet(
        `userid:${friend[0]}`, 'online'
      );

      newFriendList.push({
        id: friend[1],
        username: friend[0],
        online: Boolean(friendStatus === 'true'),
      });
    } catch (err) {
      throw err;
    }
  }

  return newFriendList;
}
