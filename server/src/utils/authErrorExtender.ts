import { AuthErrorT } from '../types/response/AuthErrorT';

export default function authErrorExtender(data?: string) {
  const err = new Error() as AuthErrorT;

  if (data) {
    err.errorData = { loggedIn: false, status: `${data} already taken` };
  } else {
    err.errorData = { loggedIn: false, status: 'Invalid credentials' };
  }

  return err;
}
