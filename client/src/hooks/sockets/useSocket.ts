import { useEffect } from 'react';

import useUserContext from '../contexts/useUserContext';
import useFriendContext from '../contexts/useFriendContext';
import socket from '../../lib/socket';

import request from '../../utils/request';
import { baseUrl } from '../../utils/consts';

const url = `${baseUrl}/auth`;

export default function useSocket() {
  const { userLogout } = useUserContext();
  const { setFriendList } = useFriendContext();

  useEffect(() => {
    socket.connect();

    socket.on('connect_error', async (err: Error) => {
      console.log(err.message)

      if (err.message === 'Token has expired') {
        try {
          await request.post(`${url}/refresh`, {});

          socket.connect();
        } catch {
          userLogout();
          return;
        }
      } else {
        userLogout();
        return;
      }
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
