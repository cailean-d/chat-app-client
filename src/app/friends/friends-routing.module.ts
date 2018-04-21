import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FriendsRootComponent } from './friends-root/friends-root.component';
import { AllFriendsComponent } from './all-friends/all-friends.component';
import { FriendsOnlineComponent } from './friends-online/friends-online.component';
import { FriendsInviteComponent } from './friends-invite/friends-invite.component';

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
      },
      // {
      //   path: 'favorite',
      //   component: FriendsFavoriteComponent
      // },
      {
        path: 'invite',
        component: FriendsInviteComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendsRoutingModule { }
