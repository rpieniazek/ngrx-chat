import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageSectionComponent } from './message-section/message-section.component';
import { ThreadListComponent } from './thread-list/thread-list.component';
import { ThreadSectionComponent } from './thread-section/thread-section.component';
import { UserSectionComponent } from './user-section/user-section.component';
import { ThreadsService } from "./services/threads.service";
import { HttpModule } from "@angular/http";
import { Action, StoreModule } from "@ngrx/store";
import { ApplicationState, INITIAL_APPLICATION_STATE } from "./store/application-state";
import { USER_THREAD_LOADED_ACTION, UserThreadsLoadedAction } from "./store/action/actions";

import * as _ from "lodash";
import { EffectsModule } from '@ngrx/effects';
import { LoadThreadsEffectService } from './store/effects/load-threads-effect.service';

export function storeReducer(state: ApplicationState, action: Action): ApplicationState {

  switch (action.type) {
    case  USER_THREAD_LOADED_ACTION:
      return handleLoadUserThreadAction(state, <UserThreadsLoadedAction>action);

    default:
      return state;
  }
}

export function handleLoadUserThreadAction(state: ApplicationState, action: UserThreadsLoadedAction): ApplicationState {
  const userData = action.payload;
  const newState: ApplicationState = Object.assign({}, state);

  newState.storeData = {
    participants: _.keyBy(action.payload.participant, 'id'),
    messages: _.keyBy(action.payload.messages, 'id'),
    threads: _.keyBy(action.payload.threads, 'id')
  };
  return newState;
}

@NgModule({
  declarations: [
    AppComponent,
    MessageListComponent,
    MessageSectionComponent,
    ThreadListComponent,
    ThreadSectionComponent,
    UserSectionComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    StoreModule.provideStore(storeReducer, {INITIAL_APPLICATION_STATE}),
    EffectsModule.forRoot([LoadThreadsEffectService])
  ],
  providers: [
    ThreadsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
