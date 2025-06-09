export interface RequestOptionsInterface {
  method: string;
  headers: Record<string, string>;
  body?: string;
}

export interface RequestInterface {
  method: string;
  url: string;
  data?: Record<string, string>;
}
