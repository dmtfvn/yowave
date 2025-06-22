import { UserDataT } from '../user/UserDataT';

export type AuthUserT = {
  loggedIn: boolean;
  userData: UserDataT;
};
