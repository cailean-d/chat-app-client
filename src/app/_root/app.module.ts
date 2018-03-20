import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './_root/app.component';
import { NgForageModule } from 'ngforage';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgForageModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
