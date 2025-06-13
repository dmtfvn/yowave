import { UserContext } from '../context/UserContext';
import usePersistUser from '../../hooks/usePersistUser';

import { UserProviderT } from '../../interfaces/user/UserProviderT';
import { UserDataT } from '../../interfaces/user/UserDataT';

export default function UserProvider({ children }: UserProviderT) {
  const { userState, setPersist } = usePersistUser('auth', {
    loggedIn: false,
    user: {
      id: '',
      username: '',
    }
  });

  const userLogin = (authData: UserDataT) => {
    setPersist(authData);
  }

  const userLogout = () => {
    setPersist({
      loggedIn: false,
      user: {
        id: '',
        username: '',
      }
    });
  }

  return (
    <UserContext.Provider value={{ ...userState, userLogin, userLogout }}>
      {children}
    </UserContext.Provider>
  );
}
