import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { MainComponent } from './main/main.component';
import { UserComponent } from './user/user.component';
import { ProfileService } from '../__services/profile.service';
import { FavoriteService } from '../__services/favorite.service';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule
  ],
  declarations: [MainComponent, UserComponent],
  exports: [
    MainComponent,
    UserComponent
  ],
  providers: [
    ProfileService,
    FavoriteService
  ]
})
export class ProfileModule { }
