import { Socket } from 'socket.io';

import setUserOffline from '../sub-main/setUserOffline';
import emitFriendStatus from '../sub-main/emitFriendStatus';
import emitStoreError from '../utils/emitStoreError';

import { UserDataT } from '../../types/user/UserDataT';

export default async function clearUserRedis(
  socket: Socket
) {
  const userData: UserDataT = socket.data.userData;

  const username = userData.username;

  try {
    await setUserOffline(username);
    await emitFriendStatus(socket, username);
  } catch (err: unknown) {
    emitStoreError(socket, err);
  }
}
