import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { ApplicationState } from "../store/application-state";
import { LoadUserThreadsAction } from "../store/action/actions";
import { Observable } from "rxjs/Observable";
import { ThreadSummaryVM } from "./thread-summary.vm";
import { mapStateToUnreadedMessagesCounter } from "./mapStateToUnreadedMessagesCounter";
import { usernameSelector } from "./mapStateToUsername";
import { stateToThreadSummariesSelector } from "./stateToThreadSummariesSelector";

@Component({
  selector: 'app-thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent implements OnInit {

  userName$: Observable<string>;
  unreadMessagesCounter$: Observable<number>;
  threadSummaries$: Observable<ThreadSummaryVM[]>;

  constructor(private  store: Store<ApplicationState>) {

    this.userName$ = store.select(usernameSelector);

    this.unreadMessagesCounter$ = store.map(mapStateToUnreadedMessagesCounter);

    this.threadSummaries$ = store.select(stateToThreadSummariesSelector);

  }

  ngOnInit() {
    this.store.dispatch(new LoadUserThreadsAction());
  }
}
