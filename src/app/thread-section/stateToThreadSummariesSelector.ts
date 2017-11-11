import {ThreadSummaryVM} from "./thread-summary.vm";
import {Thread} from "../model/thread";
import {ApplicationState} from "../store/application-state";
import * as _ from "lodash";

export function stateToThreadSummariesSelector(state: ApplicationState): ThreadSummaryVM[] {

  const threads = _.values<Thread>(state.storeData.threads);
  return threads.map(_.partial(mapToThreadSummary, state));
}

function mapToThreadSummary(state: ApplicationState, thread: Thread): ThreadSummaryVM {
  const names = _.values(thread.participants)
    .map(participantId => state.storeData.participants[participantId].name);


  const lastMessageId = _.last(thread.messageIds),
    lastMessage = state.storeData.messages[lastMessageId];

  return {
    id: thread.id,
    participantNames: _.join(names, ","),
    lastMessageText: lastMessage.text,
    timestamp: lastMessage.timestamp
  }
}
