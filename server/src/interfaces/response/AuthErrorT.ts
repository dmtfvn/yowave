import { FailedQueryT } from './FailedQueryT';

export interface AuthErrorT extends Error {
  statusCode: number;
  errorData: FailedQueryT;
}
