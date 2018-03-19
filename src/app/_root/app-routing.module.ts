import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: 'app/authentication/authentication.module#AuthenticationModule'
  },
  {
    path: 'app',
    loadChildren: 'app/core/core.module#CoreModule'
  },
  {
    path: '404',
    loadChildren: 'app/error-page/error-page.module#ErrorPageModule'
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
