import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchRootComponent } from './search-root/search-root.component';

const routes: Routes = [
  {
    path: '',
    component: SearchRootComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
