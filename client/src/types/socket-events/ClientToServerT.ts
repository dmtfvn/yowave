import { FriendT } from '../friend/FriendT';

export type ClientToServerT = {
  reqData: (
    data: string,
    callback: (errMessage: string, res: FriendT[]) => void
  ) => void;
  friendId: (
    id: string,
    callback: (res: string) => void
  ) => void;
};
