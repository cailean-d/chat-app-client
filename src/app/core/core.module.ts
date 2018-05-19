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
import { ChatService } from '../__services/chat.service';
import { SearchService } from '../__services/search.service';
import { DatePipe } from '../__pipes/date.pipe';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    I18nModule
  ],
  declarations: [
    MenuComponent,
    RootComponent,
    DatePipe
  ],
  providers: [
    InviteService,
    AuthService,
    FriendsService,
    OnlineService,
    FavoriteService,
    ChatsService,
    ProfileService,
    ChatService,
    SearchService
  ]
})
export class CoreModule { }
