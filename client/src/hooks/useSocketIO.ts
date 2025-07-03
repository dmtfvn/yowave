import { useEffect, useState } from 'react';

import useUserContext from './useUserContext';
import socket from '../lib/socket';

import useFriendContext from './useFriendContext';
import useMessageContext from './useMessageContext';

import { FriendsContextT } from '../types/friend/FriendsContextT';
import { DirectMsgT } from '../types/friend/DirectMsgT';

export default function useSocketIO() {
  const [loadingList, setLoadingList] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const { setFriendList, setFriendId } = useFriendContext();
  const { setMessages } = useMessageContext();

  const { userLogout } = useUserContext();

  useEffect(() => {
    setLoadingList(true);

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

    socket.on('friendList', (data: FriendsContextT['friendList']) => {
      setFriendList(data);

      setLoadingList(false);
    });

    socket.on('getFriendId', (data) => {
      if (data.startsWith('Error: ')) {
        setErrorMsg(data);
        return;
      }

      setFriendId(data);
    });

    socket.on('messages', (data: DirectMsgT[]) => {
      setMessages(data);
    });

    socket.on('msg', (data: DirectMsgT) => {
      setMessages(curState => [data, ...curState]);
    });

    return () => {
      socket.off('connect_error');
      socket.off('friendStatus');
      socket.off('friendList');
      socket.off('getFriendId');
      socket.off('messages');
      socket.off('msg');

      socket.disconnect();
    }
  }, [userLogout, setFriendList, setMessages, setFriendId]);

  return {
    loadingList,
    errorMsg,
  };
}
