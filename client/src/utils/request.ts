import { RequestT } from '../interfaces/request/RequestT';
import { RequestOptionsT } from '../interfaces/request/RequestOptionsT';

import { UserDataT } from '../interfaces/user/UserDataT';
import { ErrorDataT } from '../interfaces/response/ErrorDataT';

async function request({ method, url, data }: RequestT): Promise<UserDataT | ErrorDataT> {
  const options: RequestOptionsT = {
    method,
    credentials: 'include',
    headers: {}
  };

  if (data !== undefined) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }

  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      const resError: ErrorDataT = await res.json();

      return resError;
    }

    if (res.status === 204) {
      return { loggedIn: false, status: 'No content available' };
    }

    const data: UserDataT = await res.json();

    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
      throw err;
    } else {
      console.error('Unknown error', err);
      throw new Error('Unknown error occurred');
    }
  }
}

export default {
  get: (url: string) => request({ method: 'GET', url }),
  post: (url: string, data: Record<string, string>) => request({ method: 'POST', url, data }),
  put: (url: string, data: Record<string, string>) => request({ method: 'PUT', url, data }),
  delete: (url: string) => request({ method: 'DELETE', url }),
};
