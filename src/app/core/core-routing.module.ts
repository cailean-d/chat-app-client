import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootComponent } from './root/root.component';

const routes: Routes = [{
  path: '',
  component: RootComponent,
  children: [
    { path: '',
      loadChildren: 'app/own-profile/own-profile.module#OwnProfileModule'
    },
    {
      path: 'friends',
      loadChildren: 'app/friends/friends.module#FriendsModule'
    },
    {
      path: 'messages',
      loadChildren: 'app/messages/messages.module#MessagesModule'
    },
    {
      path: 'settings',
      loadChildren: 'app/settings/settings.module#SettingsModule'
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
