export interface RequestOptionsI {
  method: string;
  credentials: RequestCredentials,
  headers: Record<string, string>;
  body?: string;
}
