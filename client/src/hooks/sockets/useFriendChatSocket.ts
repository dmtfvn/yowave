import { useEffect } from 'react';

import useMessageContext from '../contexts/useMessageContext';
import socket from '../../lib/socket';

import { DirectMsgT } from '../../types/friend/DirectMsgT';

export default function useFriendChatSocket() {
  const { setMessages } = useMessageContext();

  useEffect(() => {
    socket.on('messages', (data: DirectMsgT[]) => {
      setMessages(data);
    });

    socket.on('msg', (data: DirectMsgT) => {
      setMessages(curState => [data, ...curState]);
    });

    return () => {
      socket.off('messages');
      socket.off('msg');
    }
  }, [setMessages]);
}
