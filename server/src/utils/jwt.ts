import jwt, { JwtPayload } from 'jsonwebtoken';

import { UserDataT } from '../types/user/UserDataT';

const secret = process.env.JWT_SECRET as string;

export function generateToken(data: UserDataT): string {
  const payload = {
    loggedIn: true,
    userData: {
      userid: data.userid,
      username: data.username,
    },
  };

  const result = jwt.sign(payload, secret, { expiresIn: '15min' });

  return result;
}

export function verifyToken(token: string) {
  const result = jwt.verify(token, secret) as JwtPayload;

  return result;
}
