import {Component, OnInit} from '@angular/core';
import {ThreadsService} from "../services/threads.service";
import {Store} from "@ngrx/store";
import {ApplicationState} from "../store/application-state";
import {LoadUserThreadsAction} from "../store/action/actions";
import {Observable} from "rxjs/Observable";
import {ThreadSummaryVM} from "./thread-summary.vm";
import {mapStateToUnreadedMessagesCounter} from "./mapStateToUnreadedMessagesCounter";
import {mapStateToUsername} from "./mapStateToUsername";
import {Thread} from "../model/thread";
import * as _ from "lodash";

@Component({
  selector: 'app-thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent implements OnInit {

  userName$: Observable<string>;
  unreadMessagesCounter$: Observable<number>;
  threadSummaries$: Observable<ThreadSummaryVM[]>;

  constructor(private threadService: ThreadsService,
              private  store: Store<ApplicationState>) {

    this.userName$ = store
      .skip(1)
      .map(mapStateToUsername);

    this.unreadMessagesCounter$ = store
      .skip(1)
      .map(mapStateToUnreadedMessagesCounter);

    store.select(
      state => {
        const threads = _.values<Thread>(state.storeData.threads);
        return threads.map(thread => {
          const names = _.values(thread.participants)
            .map(participantId => state.storeData.participants[participantId].name);


          const lastMessageId = _.last(thread.messageIds),
            lastMessage = state.storeData.messages[lastMessageId];

          return {
            id: thread.id,
            participantNames: _.join(names, ","),
            lastMessageText: lastMessage.text,
            timeStamp: lastMessage.timestamp
          }
        });
      }
    );
  }

  ngOnInit() {
    this.threadService.loadUserThreads()
      .subscribe(allUserData => this.store.dispatch(
        new LoadUserThreadsAction(allUserData)
        )
      );
  }
}
