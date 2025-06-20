export type RequestOptionsT = {
  method: string;
  credentials: RequestCredentials;
  headers: Record<string, string>;
  body?: string;
};
