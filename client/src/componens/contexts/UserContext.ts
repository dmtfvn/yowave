import { createContext } from 'react';

import { UserContextT } from '../../types/user/UserContextT';

export const UserContext = createContext<UserContextT>({
  loggedIn: false,
  userData: {
    userid: '',
    username: '',
  },
  userLogin: () => {},
  userLogout: () => {}
});
