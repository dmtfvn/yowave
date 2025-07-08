import { useEffect, useState } from 'react';

import useFriendContext from '../contexts/useFriendContext';
import socket from '../../lib/socket';

import { FriendsContextT } from '../../types/friend/FriendsContextT';

export default function useFriendListSocket() {
  const [loadingList, setLoadingList] = useState(true);

  const { setFriendList } = useFriendContext();

  useEffect(() => {
    setLoadingList(true);

    socket.on('friendList', (data: FriendsContextT['friendList']) => {
      setFriendList(data);

      setLoadingList(false);
    });

    return () => {
      socket.off('friendList');
    }
  }, [setFriendList]);

  return {
    loadingList
  };
}
