import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FriendsRootComponent } from './friends-root/friends-root.component';

const routes: Routes = [
  {
    path: '',
    component: FriendsRootComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendsRoutingModule { }
