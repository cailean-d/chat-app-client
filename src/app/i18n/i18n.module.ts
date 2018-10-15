import { DatePipe } from '../__pipes/date.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageListPipe } from '../__pipes/message-list.pipe';
import { OnlinePipe } from '../__pipes/online.pipe';
import { GenderPipe } from '../__pipes/gender.pipe';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StopBubblingDirective } from '../__directives/stop-bubbling.directive';
import { DefaultAvatarDirective } from '../__directives/default-avatar.directive';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


const options = {
  loader: {
    provide: TranslateLoader,
    useFactory: (createTranslateLoader),
    deps: [HttpClient]
  }
};

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(options),
  ],
  declarations: [
    DatePipe,
    GenderPipe,
    OnlinePipe,
    StopBubblingDirective,
    DefaultAvatarDirective,
    MessageListPipe
  ],
  exports: [
    TranslateModule,
    DatePipe,
    GenderPipe,
    OnlinePipe,
    StopBubblingDirective,
    DefaultAvatarDirective,
    MessageListPipe
  ]
})
export class I18nModule { }
