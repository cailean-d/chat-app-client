import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { MenuComponent } from './menu/menu.component';
import { RootComponent } from './root/root.component';
import { InviteService } from '../__services/invite.service';
import { I18nModule } from '../i18n/i18n.module';

import { AuthService } from '../__services/auth.service';
import { FriendsService } from '../__services/friends.service';
import { OnlineService } from '../__services/online.service';
import { FavoriteService } from '../__services/favorite.service';
import { ChatsService } from '../__services/chats.service';
import { ProfileService } from '../__services/profile.service';
import { SearchService } from '../__services/search.service';
import { OwnProfileService } from '../__services/own-profile.service';
import { SocketService } from '../__services/socket.service';
import { NotificationService } from '../__services/notification.service';
import { PeerService } from '../__services/peer.service';
import { PeerModule } from '../peer/peer.module';


@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    I18nModule,
    PeerModule
  ],
  declarations: [
    MenuComponent,
    RootComponent,
  ],
  providers: [
    InviteService,
    AuthService,
    FriendsService,
    OnlineService,
    FavoriteService,
    ChatsService,
    ProfileService,
    SearchService,
    OwnProfileService,
    SocketService,
    NotificationService,
    PeerService
  ]
})
export class CoreModule { }
