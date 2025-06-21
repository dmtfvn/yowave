import { useEffect } from 'react';

import useUserContext from './useUserContext';
import socket from '../lib/socket';

export default function useSocketIO() {
  const { userLogout } = useUserContext();

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    socket.on('connect_error', () => {
      userLogout();
    });

    return () => {
      socket.off('connect_error');
      socket.disconnect();
    }
  }, [userLogout]);
}
