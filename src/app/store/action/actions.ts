import {Action} from '@ngrx/store';
import {AllUserData} from '../../model/all-user-data';

export const LOAD_USER_ACTION = 'LOAD_USER_ACTION';
export const USER_THREAD_LOADED_ACTION = 'USER_THREAD_LOADED_ACTION';

export class LoadUserThreadsAction implements Action {
  readonly type = LOAD_USER_ACTION;
}

export class UserThreadsLoadedAction implements Action {

  readonly type = USER_THREAD_LOADED_ACTION;

  constructor(public payload?: AllUserData) {

  }
}
