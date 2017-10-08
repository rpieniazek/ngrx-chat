import {Thread} from "../model/thread";
import {ApplicationState} from "../store/application-state";
import * as _ from "lodash";

export function mapStateToUnreadedMessagesCounter(state: ApplicationState): number {
  const currentUserId = state.uiState.userId;

  return _.values<Thread>(state.storeData.threads)
    .reduce((acc, thread) =>
      thread.participants[currentUserId], 0
    );
}
