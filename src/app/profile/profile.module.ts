import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { MainComponent } from './main/main.component';
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule
  ],
  declarations: [MainComponent, UserComponent],
  exports: [
    MainComponent,
    UserComponent
  ]
})
export class ProfileModule { }
