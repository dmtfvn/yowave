import { RequestI } from '../interfaces/request/RequestI';
import { RequestOptionsI } from '../interfaces/request/RequestOptionsI';
import { RequestErrorI } from '../interfaces/request/RequestErrorI';

import { ResponseI } from '../interfaces/response/ResponseI';

async function request({ method, url, data }: RequestI): Promise<ResponseI | undefined> {
  const options: RequestOptionsI = {
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
      const err: RequestErrorI = await res.json();

      throw new Error(err.message);
    }

    if (res.status !== 204) {
      const data: ResponseI = await res.json();

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
