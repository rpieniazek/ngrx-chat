import {Action} from "@ngrx/store";
import {AllUserData} from "../../model/all-user-data";

export const LOAD_USER_THREAD_ACTION = 'LOAD_USER_THREAD_ACTION';


export class LoadUserThreadsAction implements Action {

  readonly type = LOAD_USER_THREAD_ACTION;

  constructor(public payload?: AllUserData) {

  }
}
