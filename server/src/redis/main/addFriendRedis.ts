import getUserId from '../sub-main/getUserId';
import addUniqueFriend from '../sub-main/addUniqueFriend';
import getFriendList from '../sub-main/getFriendList';
import parseFriendList from '../utils/parseFriendList';

import { FriendSocketT } from '../../types/request/FriendSocketT';
import { UserDataT } from '../../types/user/UserDataT';
import emitStoreError from '../utils/emitStoreError';

export default async function addFriendRedis({
  socket,
  name,
  callback
}: FriendSocketT) {
  const userData: UserDataT = socket.data.userData;

  const username = userData.username;

  if (!username || username === name) {
    return;
  }

  try {
    const friendId = await getUserId(name);
    if (!friendId) {
      callback('Invalid friend name', []);
      return;
    }

    const isAdded = await addUniqueFriend(name, username, friendId);
    if (!isAdded) {
      callback('Friend already added', []);
      return;
    }

    const curFriendList = await getFriendList(username);
    const parsedList = await parseFriendList(curFriendList);

    callback('', parsedList);
  } catch (err: unknown) {
    emitStoreError(socket, err);
  }
}
