import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorPageRoutingModule } from './error-page-routing.module';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

@NgModule({
  imports: [
    CommonModule,
    ErrorPageRoutingModule
  ],
  declarations: [PagenotfoundComponent]
})
export class ErrorPageModule { }
