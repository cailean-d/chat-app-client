import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './_root/app.component';
import { NgForageModule } from 'ngforage';
import { HttpClientModule } from '@angular/common/http';
import { I18nService } from '../__services/i18n.service';
import { I18nModule } from '../i18n/i18n-root.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgForageModule,
    HttpClientModule,
    I18nModule
  ],
  bootstrap: [AppComponent],
  providers: [I18nService]
})
export class AppModule { }
