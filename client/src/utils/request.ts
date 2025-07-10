import { RequestT } from '../types/request/RequestT';
import { RequestOptionsT } from '../types/request/RequestOptionsT';

import { UserT } from '../types/user/UserT';
import { ErrorDataT } from '../types/response/ErrorDataT';

async function request({
  method,
  url,
  data
}: RequestT): Promise<UserT> {
  const options: RequestOptionsT = {
    method,
    credentials: 'include',
    headers: {}
  };

  if (data !== undefined) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }

  const res = await fetch(url, options);

  if (!res.ok) {
    const resError: ErrorDataT = await res.json();

    throw new Error(resError.error);
  }

  if (res.status === 204) {
    throw new Error('No content available');
  }

  const result: UserT = await res.json();

  return result;
}

export default {
  get: (
    url: string
  ) => request({ method: 'GET', url }),
  post: (
    url: string, data: Record<string, string>
  ) => request({ method: 'POST', url, data }),
  put: (
    url: string, data: Record<string, string>
  ) => request({ method: 'PUT', url, data }),
  delete: (
    url: string
  ) => request({ method: 'DELETE', url })
};
