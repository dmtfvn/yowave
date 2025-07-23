import jwt, { JwtPayload } from 'jsonwebtoken';

import { UserDataT } from '../types/user/UserDataT';

export function generateToken(
  data: UserDataT,
  secret: string,
  duration: number
): string {
  const payload = {
    loggedIn: true,
    userData: {
      userid: data.userid,
      username: data.username
    }
  };

  const token = jwt.sign(payload, secret, {
    expiresIn: duration
  });

  return token;
}

export function verifyToken(
  token: string,
  secret: string
) {
  const result = jwt.verify(token, secret) as JwtPayload;

  return result;
}
