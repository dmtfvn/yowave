import { FailedQueryT } from './FailedQueryT';

export interface AuthErrorT extends Error {
  errorData: FailedQueryT;
}
