import { Socket } from 'socket.io';

import getFriendList from './getFriendList';
import parseFriendList from '../utils/parseFriendList';

export default async function emitFriendStatus(
  socket: Socket,
  username: string
) {
  const friendList = await getFriendList(username);

  if (friendList.length) {
    const friendRooms = await parseFriendList(friendList).then((friends) => {
      return friends.map(f => f.id);
    });

    socket.to(friendRooms).emit('friendStatus', username, false);
  }
}
