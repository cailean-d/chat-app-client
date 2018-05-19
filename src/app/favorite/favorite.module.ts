import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoriteRoutingModule } from './favorite-routing.module';
import { FavoriteRootComponent } from './favorite-root/favorite-root.component';
import { ProfileModule } from '../profile/profile.module';
import { I18nModule } from '../i18n/i18n.module';

@NgModule({
  imports: [
    CommonModule,
    FavoriteRoutingModule,
    ProfileModule,
    I18nModule
  ],
  declarations: [
    FavoriteRootComponent,
  ],
  providers: []
})
export class FavoriteModule { }
