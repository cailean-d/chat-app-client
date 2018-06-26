import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoCallComponent } from './video-call/video-call.component';
import { I18nModule } from '../i18n/i18n.module';

@NgModule({
  imports: [
    CommonModule,
    I18nModule
  ],
  declarations: [VideoCallComponent],
  exports: [VideoCallComponent]
})
export class PeerModule { }
