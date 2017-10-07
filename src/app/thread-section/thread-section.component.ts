import {Component, OnInit} from '@angular/core';
import {ThreadsService} from "../services/threads.service";
import {Store} from "@ngrx/store";
import {ApplicationState} from "../store/application-state";
import {LoadUserThreadsAction} from "../store/action/actions";

@Component({
  selector: 'app-thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent implements OnInit {

  constructor(private threadService: ThreadsService,
              private  store: Store<ApplicationState>) {

    store.subscribe(
      console.log)

  }

  ngOnInit() {
    this.threadService.loadUserThreads()
      .subscribe(allUserData => this.store.dispatch(
        new LoadUserThreadsAction(allUserData)
        )
      );
  }
}
