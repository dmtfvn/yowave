import { RequestT } from '../interfaces/request/RequestT';
import { RequestOptionsT } from '../interfaces/request/RequestOptionsT';
import { RequestErrorT } from '../interfaces/request/RequestErrorT';

import { UserDataT } from '../interfaces/user/UserDataT';

async function request({ method, url, data }: RequestT): Promise<UserDataT | undefined> {
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
      const err: RequestErrorT = await res.json();

      throw new Error(err.message);
    }

    if (res.status !== 204) {
      const data: UserDataT = await res.json();

      return data;
    }
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
