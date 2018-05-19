import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupMessageComponent } from './popup-message/popup-message.component';
import { I18nModule } from '../i18n/i18n.module';

@NgModule({
  imports: [
    CommonModule,
    I18nModule
  ],
  declarations: [PopupMessageComponent],
  exports: [PopupMessageComponent]
})
export class NotificationModule { }
