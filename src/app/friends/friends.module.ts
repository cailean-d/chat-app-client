import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendsRoutingModule } from './friends-routing.module';
import { FriendsRootComponent } from './friends-root/friends-root.component';

@NgModule({
  imports: [
    CommonModule,
    FriendsRoutingModule
  ],
  declarations: [FriendsRootComponent]
})
export class FriendsModule { }
