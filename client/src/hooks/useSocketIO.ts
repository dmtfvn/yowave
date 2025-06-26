import { useEffect, useState } from 'react';

import useUserContext from './useUserContext';
import socket from '../lib/socket';

import { FriendsContextT } from '../types/friend/FriendsContextT';

export default function useSocketIO(setFriendList: FriendsContextT['setFriendList']) {
  const [loading, setLoading] = useState(true);

  const { userLogout } = useUserContext();

  useEffect(() => {
    setLoading(true);

    socket.connect();

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    socket.on('connect_error', () => {
      userLogout();
    });

    socket.on('status', (status, username) => {
      setFriendList(curState => {
        return curState.map(f => {
          if (f.username === username) {
            f.online = status;
          }

          return f;
        });
      });
    });

    socket.on('friends', (friendList: FriendsContextT['friendList']) => {
      setFriendList(friendList);

      setLoading(false);
    });

    return () => {
      socket.off('connect_error');
      socket.disconnect();
    }
  }, [userLogout, setFriendList]);

  return {
    loading,
  };
}
