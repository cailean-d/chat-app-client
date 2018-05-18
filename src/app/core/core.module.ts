import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { MenuComponent } from './menu/menu.component';
import { RootComponent } from './root/root.component';
import { InviteService } from '../__services/invite.service';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

import { AuthService } from '../__services/auth.service';
import { FriendsService } from '../__services/friends.service';
import { OnlineService } from '../__services/online.service';
import { FavoriteService } from '../__services/favorite.service';
import { ChatsService } from '../__services/chats.service';
import { ProfileService } from '../__services/profile.service';
import { ChatService } from '../__services/chat.service';
import { SearchService } from '../__services/search.service';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
  })
  ],
  declarations: [
    MenuComponent,
    RootComponent
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
