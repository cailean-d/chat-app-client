import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { DialogListComponent } from './dialog-list/dialog-list.component';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MessagesRoutingModule
  ],
  declarations: [DialogListComponent, DialogComponent]
})
export class MessagesModule { }
