import { FriendsContextT } from '../friend/FriendsContextT';

export type ServerToClientT = {
  friendStatus: (username: string, online: boolean) => void;
  friendList: (data: FriendsContextT['friendList']) => void;
  getFriendId: (data: string) => void;
  messages: (message: Record<string, string>[]) => void;
};
