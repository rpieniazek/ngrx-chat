import {Participant} from "../model/participant";
import {Thread} from "../model/thread";
import {Message} from "../model/message";

export interface StoreData {

  participants: { [key: number]: Participant }

  threads: { [key: number]: Thread };

  messages: { [key: number]: Message };
}

export const INITIAL_STORE_DATA: StoreData = {
  participants: {},
  threads: {},
  messages: {}
};
