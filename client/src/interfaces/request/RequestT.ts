export interface RequestT {
  method: string;
  url: string;
  data?: Record<string, string>;
}
