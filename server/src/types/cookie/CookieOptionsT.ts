export type CookieOptionsT = {
  path?: string;
  secure: boolean;
  httpOnly: boolean;
  sameSite: 'none' | 'lax' | 'strict';
};
