import { createContext } from 'react';

import { UserContextI } from '../../interfaces/user/UserContextI';

export const UserContext = createContext<UserContextI>({
  id: '',
  username: '',
  userLogin: () => null,
  userLogout: () => null,
});
