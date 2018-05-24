import { DatePipe } from '../__pipes/date.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenderPipe } from '../__pipes/gender.pipe';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StopBubblingDirective } from '../__directives/stop-bubbling.directive';

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
    StopBubblingDirective
  ],
  exports: [TranslateModule, DatePipe, GenderPipe, StopBubblingDirective]
})
export class I18nModule { }
