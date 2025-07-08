import { useEffect, useState } from 'react';

import useFriendContext from '../contexts/useFriendContext';
import socket from '../../lib/socket';

export default function useFriendIdSocket() {
  const [errorMsg, setErrorMsg] = useState('');

  const { setFriendId } = useFriendContext();

  useEffect(() => {
    socket.on('getFriendId', (data) => {
      if (data.startsWith('Error: ')) {
        setErrorMsg(data);
        return;
      }

      setFriendId(data);
    });

    return () => {
      socket.off('getFriendId');
    }
  }, [setFriendId]);

  return {
    errorMsg
  };
}
