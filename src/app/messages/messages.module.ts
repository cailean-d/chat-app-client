import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { DialogListComponent } from './dialog-list/dialog-list.component';
import { DialogComponent } from './dialog/dialog.component';
import { DialogEmptyComponent } from './dialog-empty/dialog-empty.component';
import { DatePipe } from '../__pipes/date.pipe';
import { I18nModule } from '../i18n/i18n.module';

@NgModule({
  imports: [
    CommonModule,
    MessagesRoutingModule,
    I18nModule
  ],
  declarations: [
    DialogListComponent,
    DialogComponent,
    DialogEmptyComponent,
    DatePipe
  ],
  providers: []
})
export class MessagesModule { }
