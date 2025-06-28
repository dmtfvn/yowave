import { useEffect, useState } from 'react';

import useUserContext from './useUserContext';
import socket from '../lib/socket';

import { FriendsContextT } from '../types/friend/FriendsContextT';
import useFriendContext from './useFriendContext';
import useMessageContext from './useMessageContext';

export default function useSocketIO() {
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const { setFriendList, setFriendId } = useFriendContext();
  const { setMessages } = useMessageContext();

  const { userLogout } = useUserContext();

  useEffect(() => {
    setLoading(true);

    socket.connect();

    socket.on('connect_error', () => {
      userLogout();
    });

    socket.on('friendStatus', (username, status) => {
      setFriendList(curState => {
        return curState.map(f => {
          if (f.username === username) {
            f.online = status;
          }

          return f;
        });
      });
    });

    socket.on('friendList', (friendList: FriendsContextT['friendList']) => {
      setFriendList(friendList);

      setLoading(false);
    });

    socket.on('getFriendId', (data) => {
      if (data.startsWith('Error: ')) {
        setErrorMsg(data);
        return;
      }

      setFriendId(data);
    });

    socket.on('messages', (messages: Record<string, string>[]) => {
      setMessages(messages);
    });

    return () => {
      socket.off('connect_error');
      socket.off('friendStatus');
      socket.off('friendList');
      socket.off('getFriendId');
      socket.off('messages');

      socket.disconnect();
    }
  }, [userLogout, setFriendList, setMessages, setFriendId]);

  return {
    loading,
    errorMsg,
  };
}
