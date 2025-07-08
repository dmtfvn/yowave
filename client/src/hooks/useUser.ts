import { useEffect, useState } from 'react';

import { baseUrl } from '../utils/consts';

import { UserT } from '../types/user/UserT';

export default function useUser() {
  const [user, setUser] = useState<UserT>({
    loggedIn: false,
    userData: {
      userid: '',
      username: ''
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${baseUrl}/account/user`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data: UserT) => {
        if (data.userData.userid) {
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
        userid: '',
        username: ''
      }
    });
  }

  return {
    user,
    loading,
    userLogin,
    userLogout
  };
}
