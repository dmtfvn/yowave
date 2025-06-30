import { Dispatch, SetStateAction } from 'react';

import { DirectMsgT } from '../friend/DirectMsgT';

export type MessagesContextT = {
  messages: DirectMsgT[];
  setMessages: Dispatch<SetStateAction<DirectMsgT[]>>;
};
