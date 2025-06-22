import { UserDataT } from '../types/user/UserDataT';
import { AuthUserT } from '../types/response/AuthUserT';

export default function authUserCreator(data: UserDataT): AuthUserT {
  return {
    loggedIn: true,
    userData: {
      userid: data.userid,
      username: data.username,
    },
  };
}
