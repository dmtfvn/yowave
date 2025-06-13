import { useEffect, useState } from 'react';

import { UserDataT } from '../interfaces/user/UserDataT';

export default function usePersistUser(key: string, initialState: UserDataT) {
  const [userState, setUserState] = useState(initialState);

  useEffect(() => {
    const storageData = localStorage.getItem(key);

    if (storageData) {
      setUserState(JSON.parse(storageData));
    }
  }, [key]);

  const setPersist = (newState: UserDataT) => {
    setUserState(newState);

    localStorage.setItem(key, JSON.stringify(newState));
  };

  return {
    userState,
    setPersist
  };
}
