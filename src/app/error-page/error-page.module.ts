import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorPageRoutingModule } from './error-page-routing.module';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { I18nModule } from '../i18n/i18n.module';

@NgModule({
  imports: [
    CommonModule,
    ErrorPageRoutingModule,
    I18nModule
  ],
  declarations: [PagenotfoundComponent]
})
export class ErrorPageModule { }
