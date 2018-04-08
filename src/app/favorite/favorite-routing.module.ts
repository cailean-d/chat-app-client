import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavoriteRootComponent } from './favorite-root/favorite-root.component';
import { MainComponent } from '../profile/main/main.component';
import { UserComponent } from '../profile/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: FavoriteRootComponent,
    children: [
      {
        path: '',
        component: MainComponent
      },
      {
        path: 'user/:id',
        component: UserComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoriteRoutingModule { }
