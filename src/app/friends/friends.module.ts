import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendsRoutingModule } from './friends-routing.module';
import { FriendsRootComponent } from './friends-root/friends-root.component';
import { AllFriendsComponent } from './all-friends/all-friends.component';
import { FriendsOnlineComponent } from './friends-online/friends-online.component';
import { FriendsInviteComponent } from './friends-invite/friends-invite.component';
import { ProfileModule } from '../profile/profile.module';
import { I18nModule } from '../i18n/i18n.module';

@NgModule({
  imports: [
    CommonModule,
    FriendsRoutingModule,
    ProfileModule,
    I18nModule
  ],
  providers: [],
  declarations: [
    FriendsRootComponent,
    AllFriendsComponent,
    FriendsOnlineComponent,
    FriendsInviteComponent,
  ]
})
export class FriendsModule { }
