import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsRootComponent } from './settings-root/settings-root.component';
import { I18nModule } from '../i18n/i18n.module';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    I18nModule
  ],
  declarations: [SettingsRootComponent]
})
export class SettingsModule { }
