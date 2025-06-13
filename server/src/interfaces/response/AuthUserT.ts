export interface AuthUserT {
  loggedIn: boolean;
  user: {
    id: string;
    username: string;
  }
}
