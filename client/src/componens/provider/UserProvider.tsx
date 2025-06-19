import { useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';

import { baseUrl } from '../../utils/consts';

import { UserProviderT } from '../../interfaces/user/UserProviderT';
import { UserDataT } from '../../interfaces/user/UserDataT';

export default function UserProvider({ children }: UserProviderT) {
  const [user, setUser] = useState<UserDataT>({
    loggedIn: false,
    user: {
      id: '',
      username: '',
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${baseUrl}/account/user`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data: UserDataT) => {
        if (data.user.id) {
          setUser(data);
        }
      })
      .catch(() => {
        console.log('No session user')
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const userLogin = (authData: UserDataT) => {
    setUser(authData);
  }

  const userLogout = () => {
    setUser({
      loggedIn: false,
      user: {
        id: '',
        username: '',
      }
    });
  }

  if (loading) {
    return <h1 className="text-blue-800">Loading...</h1>
  }

  return (
    <UserContext.Provider value={{ ...user, userLogin, userLogout }}>
      {children}
    </UserContext.Provider>
  );
}
