import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { DialogListComponent } from './dialog-list/dialog-list.component';
import { DialogComponent } from './dialog/dialog.component';
import { ChatsService } from '../__services/chats.service';
import { DialogEmptyComponent } from './dialog-empty/dialog-empty.component';
import { ProfileService } from '../__services/profile.service';

@NgModule({
  imports: [
    CommonModule,
    MessagesRoutingModule
  ],
  declarations: [DialogListComponent, DialogComponent, DialogEmptyComponent],
  providers: [
    ChatsService,
    ProfileService
  ]
})
export class MessagesModule { }
