import { createContext } from 'react';

import { UserContextT } from '../../interfaces/user/UserContextT';

export const UserContext = createContext<UserContextT>({
  loggedIn: false,
  user: {
    id: '',
    username: '',
  },
  userLogin: () => null,
  userLogout: () => null,
});
