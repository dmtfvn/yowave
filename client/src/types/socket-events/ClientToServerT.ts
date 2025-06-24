import { FriendT } from '../friend/FriendT';

export type ClientToServerT = {
  reqData: (
    data: string,
    callback: (errMessage: string, res: FriendT['username'][]) => void
  ) => void;
};
