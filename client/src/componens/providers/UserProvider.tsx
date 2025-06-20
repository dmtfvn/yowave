import { useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';

import { baseUrl } from '../../utils/consts';

import { ChildrenT } from '../../types/children/ChildrenT';
import { UserT } from '../../types/user/UserT';

export default function UserProvider({ children }: ChildrenT) {
  const [user, setUser] = useState<UserT>({
    loggedIn: false,
    userData: {
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
      .then((data: UserT) => {
        if (data.userData.id) {
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

  const userLogin = (authData: UserT) => {
    setUser(authData);
  }

  const userLogout = () => {
    setUser({
      loggedIn: false,
      userData: {
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
