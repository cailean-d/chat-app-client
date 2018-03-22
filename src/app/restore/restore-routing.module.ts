import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestoreRootComponent } from './restore-root/restore-root.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RestoreRootComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestoreRoutingModule { }
