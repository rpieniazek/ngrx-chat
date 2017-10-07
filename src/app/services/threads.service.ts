import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {AllUserData} from "../model/all-user-data";
import {Http, HttpModule} from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class ThreadsService {

  constructor(private http: Http, httpModule: HttpModule) {
  }

  loadUserThreads(): Observable<AllUserData> {
    return this.http.get('/api/threads')
      .map(res => res.json());
  }
}
