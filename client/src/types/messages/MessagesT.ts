import { DirectMsgT } from '../friend/DirectMsgT';

export type MessagesT = {
  friendId: string;
  chatData: DirectMsgT[];
};
