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

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  imports: [
    CommonModule,
    MessagesRoutingModule,
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
  })
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
