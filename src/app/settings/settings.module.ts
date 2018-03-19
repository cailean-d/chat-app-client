import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsRootComponent } from './settings-root/settings-root.component';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule
  ],
  declarations: [SettingsRootComponent]
})
export class SettingsModule { }
