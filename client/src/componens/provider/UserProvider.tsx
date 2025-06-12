import { UserContext } from '../context/UserContext';
import usePersistUser from '../../hooks/usePersistUser';

import { UserProviderI } from '../../interfaces/user/UserProviderI';
import { UserDataI } from '../../interfaces/user/UserDataI';

export default function UserProvider({ children }: UserProviderI) {
  const { userState, setPersist } = usePersistUser('auth', {
    id: '',
    username: '',
  });

  const userLogin = (authData: UserDataI) => {
    setPersist(authData);
  }

  const userLogout = () => {
    setPersist({
      id: '',
      username: '',
    });
  }

  return (
    <UserContext.Provider value={{ ...userState, userLogin, userLogout }}>
      {children}
    </UserContext.Provider>
  );
}
