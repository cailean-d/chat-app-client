import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendsRoutingModule } from './friends-routing.module';
import { FriendsRootComponent } from './friends-root/friends-root.component';
import { FriendsService } from './services/friends.service';

@NgModule({
  imports: [
    CommonModule,
    FriendsRoutingModule
  ],
  providers: [
    FriendsService
  ],
  declarations: [FriendsRootComponent]
})
export class FriendsModule { }
