import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { DialogListComponent } from './dialog-list/dialog-list.component';
import { DialogComponent } from './dialog/dialog.component';
import { DialogEmptyComponent } from './dialog-empty/dialog-empty.component';
import { I18nModule } from '../i18n/i18n.module';
import { MessagePipe } from '../__pipes/message.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MessagesRoutingModule,
    I18nModule,
    FormsModule
  ],
  declarations: [
    DialogListComponent,
    DialogComponent,
    DialogEmptyComponent,
    MessagePipe,
  ],
  providers: []
})
export class MessagesModule { }
