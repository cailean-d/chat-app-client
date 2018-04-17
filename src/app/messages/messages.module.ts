import { ChatService } from '../__services/chat.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { DialogListComponent } from './dialog-list/dialog-list.component';
import { DialogComponent } from './dialog/dialog.component';
import { ChatsService } from '../__services/chats.service';
import { DialogEmptyComponent } from './dialog-empty/dialog-empty.component';
import { ProfileService } from '../__services/profile.service';
import { DatePipe } from '../__pipes/date.pipe';

@NgModule({
  imports: [
    CommonModule,
    MessagesRoutingModule
  ],
  declarations: [
    DialogListComponent,
    DialogComponent,
    DialogEmptyComponent,
    DatePipe
  ],
  providers: [
    ChatsService,
    ProfileService,
    ChatService
  ]
})
export class MessagesModule { }
