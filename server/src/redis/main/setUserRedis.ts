import { Socket } from 'socket.io';

import setUserOnline from '../sub-main/setUserOnline';
import emitMessages from '../sub-main/emitMessages';
import getFriendList from '../sub-main/getFriendList';
import parseFriendList from '../utils/parseFriendList';
import emitStoreError from '../utils/emitStoreError';

import { UserDataT } from '../../types/user/UserDataT';

export default async function setUserRedis(
  socket: Socket
) {
  const userData: UserDataT = socket.data.userData;

  const username = userData.username;
  const userId = userData.userid;

  socket.join(userId);

  try {
    await setUserOnline(username, userId);
    await emitMessages(socket, userId);

    const friendList = await getFriendList(username);

    if (!friendList.length) {
      socket.emit('friendList', friendList);
      return;
    }

    const parsedList = await parseFriendList(friendList);
    socket.emit('friendList', parsedList);

    const friendRooms = parsedList.map(f => f.id);
    socket.to(friendRooms).emit('friendStatus', username, true);
  } catch (err: unknown) {
    emitStoreError(socket, err);
  }
}
