import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FriendsRootComponent } from './friends-root/friends-root.component';
import { AllFriendsComponent } from './all-friends/all-friends.component';

const routes: Routes = [
  {
    path: '',
    component: FriendsRootComponent,
    children: [
      {
        path: '',
        component: AllFriendsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendsRoutingModule { }
