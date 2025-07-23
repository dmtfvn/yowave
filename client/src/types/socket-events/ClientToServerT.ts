import { FriendT } from '../friend/FriendT';
import { DirectMsgT } from '../friend/DirectMsgT';

export type ClientToServerT = {
  friendName: (
    name: string,
    callback: (errMessage: string, res: FriendT[]) => void
  ) => void;
  friendId: (
    id: string,
    callback: (res: string) => void
  ) => void;
  dm: (data: DirectMsgT) => void;
  rmFriend: (data: string) => void;
};
