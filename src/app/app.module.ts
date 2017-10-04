import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageSectionComponent } from './message-section/message-section.component';
import { ThreadListComponent } from './thread-list/thread-list.component';
import { ThreadSectionComponent } from './thread-section/thread-section.component';
import { UserSectionComponent } from './user-section/user-section.component';

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
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
