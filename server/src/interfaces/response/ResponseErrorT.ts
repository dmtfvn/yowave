import { FailedQueryT } from './FailedQueryT';

export interface ResponseErrorT {
  code: number;
  body: FailedQueryT;
}
