import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DialogListComponent } from './dialog-list/dialog-list.component';
import { DialogComponent } from './dialog/dialog.component';

const routes: Routes = [
  {
    path: '',
    component: DialogListComponent
  },
  {
    path: ':id',
    component: DialogComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule { }
