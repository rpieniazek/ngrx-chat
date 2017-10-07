import {Participant} from "./participant";
import {Thread} from "./thread";
import {Message} from "./message";

export interface AllUserData {
  participant: Participant[];
  threads: Thread[];
  messages: Message[];
}
