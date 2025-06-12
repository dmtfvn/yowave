import { UserDataI } from './UserDataI';

export interface UserContextI {
  id: string;
  username: string;
  userLogin: (authData: UserDataI) => void;
  userLogout: () => void;
}
