import { FailedQueryT } from './FailedQueryT';

export type AuthErrorT = Error & {
  errorData: FailedQueryT;
};
