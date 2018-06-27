import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsRootComponent } from './settings-root/settings-root.component';
import { GeneralComponent } from './general/general.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationsSoundComponent } from './notifications-sound/notifications-sound.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsRootComponent,
    children: [
      {
        path: '',
        redirectTo: 'general'
      },
      {
        path: 'general',
        component: GeneralComponent
      },
      {
        path: 'notifications',
        component: NotificationsComponent
      },
      {
        path: 'notifications_sound',
        component: NotificationsSoundComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
