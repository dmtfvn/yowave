export interface RequestI {
  method: string;
  url: string;
  data?: Record<string, string>;
}
