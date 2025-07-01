import { FriendsContextT } from '../friend/FriendsContextT';
import { DirectMsgT } from '../friend/DirectMsgT';

export type ServerToClientT = {
  friendStatus: (username: string, online: boolean) => void;
  friendList: (data: FriendsContextT['friendList']) => void;
  getFriendId: (data: string) => void;
  messages: (data: DirectMsgT[]) => void;
  msg: (data: DirectMsgT) => void;
};
