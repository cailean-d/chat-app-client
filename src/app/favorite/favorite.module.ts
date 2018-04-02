import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoriteRoutingModule } from './favorite-routing.module';
import { FavoriteRootComponent } from './favorite-root/favorite-root.component';

@NgModule({
  imports: [
    CommonModule,
    FavoriteRoutingModule
  ],
  declarations: [FavoriteRootComponent]
})
export class FavoriteModule { }
