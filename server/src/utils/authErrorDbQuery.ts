export default function authErrorDbQuery(
  data?: string
) {
  const err: Error = new Error();

  if (data) {
    err.message = `${data} already taken`;
  } else {
    err.message = 'Invalid credentials';
  }

  return err;
}
