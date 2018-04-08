import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoriteRoutingModule } from './favorite-routing.module';
import { FavoriteRootComponent } from './favorite-root/favorite-root.component';
import { FavoriteService } from '../__services/favorite.service';
import { ProfileModule } from '../profile/profile.module';

@NgModule({
  imports: [
    CommonModule,
    FavoriteRoutingModule,
    ProfileModule
  ],
  declarations: [FavoriteRootComponent],
  providers: [
    FavoriteService
  ]
})
export class FavoriteModule { }
