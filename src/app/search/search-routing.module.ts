import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchRootComponent } from './search-root/search-root.component';
import { MainComponent } from '../profile/main/main.component';
import { UserComponent } from '../profile/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: SearchRootComponent,
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
export class SearchRoutingModule { }
