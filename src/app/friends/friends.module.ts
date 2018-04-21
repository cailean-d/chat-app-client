import { InviteService } from '../__services/invite.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendsRoutingModule } from './friends-routing.module';
import { FriendsRootComponent } from './friends-root/friends-root.component';
import { FriendsService } from './_services/friends.service';
import { AllFriendsComponent } from './all-friends/all-friends.component';
import { FriendsOnlineComponent } from './friends-online/friends-online.component';
import { FriendsInviteComponent } from './friends-invite/friends-invite.component';

@NgModule({
  imports: [
    CommonModule,
    FriendsRoutingModule
  ],
  providers: [
    FriendsService,
    InviteService
  ],
  declarations: [
    FriendsRootComponent,
    AllFriendsComponent,
    FriendsOnlineComponent,
    FriendsInviteComponent
  ]
})
export class FriendsModule { }
