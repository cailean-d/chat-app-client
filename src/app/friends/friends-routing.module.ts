import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FriendsRootComponent } from './friends-root/friends-root.component';
import { AllFriendsComponent } from './all-friends/all-friends.component';
import { FriendsOnlineComponent } from './friends-online/friends-online.component';

const routes: Routes = [
  {
    path: '',
    component: FriendsRootComponent,
    children: [
      {
        path: '',
        redirectTo: 'all'
      },
      {
        path: 'all',
        component: AllFriendsComponent
      },
      {
        path: 'online',
        component: FriendsOnlineComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendsRoutingModule { }
