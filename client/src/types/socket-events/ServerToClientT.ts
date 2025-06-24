import { FriendsContextT } from '../friend/FriendsContextT';

export type ServerToClientT = {
  friends: (data: FriendsContextT['friendList']) => void;
};
