import { useEffect } from 'react';

import useUserContext from '../contexts/useUserContext';
import useFriendContext from '../contexts/useFriendContext';
import socket from '../../lib/socket';

export default function useSocket() {
  const { userLogout } = useUserContext();
  const { setFriendList } = useFriendContext();

  useEffect(() => {
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

    return () => {
      socket.off('connect_error');
      socket.off('friendStatus');

      socket.disconnect();
    }
  }, [userLogout, setFriendList]);
}
