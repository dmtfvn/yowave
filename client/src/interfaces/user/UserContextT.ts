import { UserT } from './UserT';
import { UserDataT } from './UserDataT';

export interface UserContextT {
  loggedIn: boolean;
  user: UserT;
  userLogin: (authData: UserDataT) => void;
  userLogout: () => void;
}
