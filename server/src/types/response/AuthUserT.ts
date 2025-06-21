import { NewUserT } from '../user/NewUserT';

export type AuthUserT = {
  loggedIn: boolean;
  userData: NewUserT;
};
