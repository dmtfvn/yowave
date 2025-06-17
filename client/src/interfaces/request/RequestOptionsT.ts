export interface RequestOptionsT {
  method: string;
  credentials: RequestCredentials;
  headers: Record<string, string>;
  body?: string;
}
