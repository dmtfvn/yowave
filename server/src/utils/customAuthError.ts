import { AuthErrorT } from '../interfaces/response/AuthErrorT';

export default function customAuthError(data?: string) {
  const err = new Error() as AuthErrorT;

  if (data) {
    err.errorData = { loggedIn: false, status: `${data} already taken` };
  } else {
    err.errorData = { loggedIn: false, status: 'Invalid credentials' }
  }

  return err;
}
