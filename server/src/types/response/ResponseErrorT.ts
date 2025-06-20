import { FailedQueryT } from './FailedQueryT';

export type ResponseErrorT = {
  code: number;
  body: FailedQueryT;
};
