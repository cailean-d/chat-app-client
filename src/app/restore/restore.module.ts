import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestoreRoutingModule } from './restore-routing.module';
import { RestoreRootComponent } from './restore-root/restore-root.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '../i18n/i18n.module';

@NgModule({
  imports: [
    CommonModule,
    RestoreRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    I18nModule
  ],
  declarations: [RestoreRootComponent]
})
export class RestoreModule { }
