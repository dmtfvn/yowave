import { UserDataT } from './UserDataT';
import { UserT } from './UserT';

export type UserContextT = {
  loggedIn: boolean;
  userData: UserDataT;
  userLogin: (authData: UserT) => void;
  userLogout: () => void;
};
