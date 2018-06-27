import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsRootComponent } from './settings-root/settings-root.component';
import { I18nModule } from '../i18n/i18n.module';
import { GeneralComponent } from './general/general.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationsSoundComponent } from './notifications-sound/notifications-sound.component';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    I18nModule
  ],
  declarations: [SettingsRootComponent, GeneralComponent, NotificationsComponent, NotificationsSoundComponent]
})
export class SettingsModule { }
