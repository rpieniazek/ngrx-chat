import {Component, OnInit} from '@angular/core';
import {ThreadsService} from "../services/threads.service";
import {Store} from "@ngrx/store";
import {ApplicationState} from "../store/application-state";
import {LoadUserThreadsAction} from "../store/action/actions";
import {Observable} from "rxjs/Observable";
import {ThreadSummaryVM} from "./thread-summary.vm";
import {mapStateToUnreadedMessagesCounter} from "./mapStateToUnreadedMessagesCounter";
import {mapStateToUsername} from "./mapStateToUsername";
import {stateToThreadSummariesSelector} from "./stateToThreadSummariesSelector";

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

    this.threadSummaries$ = store.select(stateToThreadSummariesSelector);

  }


  ngOnInit() {
    this.threadService.loadUserThreads()
      .subscribe(allUserData => this.store.dispatch(
        new LoadUserThreadsAction(allUserData)
        )
      );
  }
}
