import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FriendsRootComponent } from './friends-root/friends-root.component';
import { AllFriendsComponent } from './all-friends/all-friends.component';
import { FriendsOnlineComponent } from './friends-online/friends-online.component';
import { FriendsInviteComponent } from './friends-invite/friends-invite.component';
import { MainComponent } from '../profile/main/main.component';
import { UserComponent } from '../profile/user/user.component';

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
        children: [
          {
            path: '',
            children: [
              {
                path: '',
                component: AllFriendsComponent
              },
              {
                path: '',
                component: MainComponent,
                outlet: 'main'
              }
            ]
          },
          {
            path: 'user/:id',
            children: [
              {
                path: '',
                component: AllFriendsComponent
              },
              {
                path: '',
                component: UserComponent,
                outlet: 'main'
              }
            ]
          }
        ]
      },
      {
        path: 'online',
        children: [
          {
            path: '',
            children: [
              {
                path: '',
                component: FriendsOnlineComponent
              },
              {
                path: '',
                component: MainComponent,
                outlet: 'main'
              }
            ]
          },
          {
            path: 'user/:id',
            children: [
              {
                path: '',
                component: FriendsOnlineComponent
              },
              {
                path: '',
                component: UserComponent,
                outlet: 'main'
              }
            ]
          }
        ]
      },
      {
        path: 'invite',
        children: [
          {
            path: '',
            children: [
              {
                path: '',
                component: FriendsInviteComponent
              },
              {
                path: '',
                component: MainComponent,
                outlet: 'main'
              }
            ]
          },
          {
            path: 'user/:id',
            children: [
              {
                path: '',
                component: FriendsInviteComponent
              },
              {
                path: '',
                component: UserComponent,
                outlet: 'main'
              }
            ]
          }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendsRoutingModule { }
