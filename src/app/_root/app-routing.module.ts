import { AuthService } from './service/auth.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, PreloadingStrategy } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { TestTemplateComponent } from './test-template/test-template.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: 'app/authentication/authentication.module#AuthenticationModule'
  },
  {
    path: 'app',
    canActivate: [AuthGuard],
    loadChildren: 'app/core/core.module#CoreModule'
  },
  {
    path: '404',
    loadChildren: 'app/error-page/error-page.module#ErrorPageModule'
  },
  {
    path: 'restore',
    loadChildren: 'app/restore/restore.module#RestoreModule'
  },
  {
    path: 'template',
    component: TestTemplateComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
  providers: [AuthGuard, AuthService],
})
export class AppRoutingModule { }
