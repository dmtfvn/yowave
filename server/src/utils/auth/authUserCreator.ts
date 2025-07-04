import { UserDataT } from '../../types/user/UserDataT';
import { AuthUserT } from '../../types/response/AuthUserT';

import { generateToken } from '../jwt';

export default function authUserCreator(data: UserDataT): AuthUserT {
  const token = generateToken(data);

  return {
    loggedIn: true,
    token,
    userData: {
      userid: data.userid,
      username: data.username,
    },
  };
}
