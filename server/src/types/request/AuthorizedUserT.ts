import { RequestSessionT } from './RequestSessionT';
import { AuthUserT } from '../response/AuthUserT';

export type AuthorizedUserT = RequestSessionT & {
  user: AuthUserT;
};
