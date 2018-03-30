import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendsRoutingModule } from './friends-routing.module';
import { FriendsRootComponent } from './friends-root/friends-root.component';
import { FriendsService } from './services/friends.service';
import { AllFriendsComponent } from './all-friends/all-friends.component';
import { FriendsOnlineComponent } from './friends-online/friends-online.component';

@NgModule({
  imports: [
    CommonModule,
    FriendsRoutingModule
  ],
  providers: [
    FriendsService
  ],
  declarations: [FriendsRootComponent, AllFriendsComponent, FriendsOnlineComponent]
})
export class FriendsModule { }
