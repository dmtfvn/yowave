import { useEffect, useState } from 'react';

import { UserDataI } from '../interfaces/user/UserDataI';

export default function usePersistUser(key: string, initialState: UserDataI) {
  const [userState, setUserState] = useState(initialState);

  useEffect(() => {
    const storageData = localStorage.getItem(key);

    if (storageData) {
      setUserState(JSON.parse(storageData));
    }
  }, [key]);

  const setPersist = (newState: UserDataI) => {
    setUserState(newState);

    localStorage.setItem(key, JSON.stringify(newState));
  };

  return {
    userState,
    setPersist
  };
}
