import { redisClient } from '../../lib/redis';

import getFriendList from './getFriendList';

export default async function addUniqueFriend(
  name: string,
  username: string,
  friendId: string
): Promise<boolean> {
  try {
    const friendList = await getFriendList(username);

    const friend = `${name}:${friendId}`;

    if (friendList.includes(friend)) {
      return false;
    }

    await redisClient.lPush(
      `friends:${username}`, friend
    );

    return true;
  } catch (err) {
    throw err;
  }
}
