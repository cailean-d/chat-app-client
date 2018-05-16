import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendsRoutingModule } from './friends-routing.module';
import { FriendsRootComponent } from './friends-root/friends-root.component';
import { AllFriendsComponent } from './all-friends/all-friends.component';
import { FriendsOnlineComponent } from './friends-online/friends-online.component';
import { FriendsInviteComponent } from './friends-invite/friends-invite.component';
import { ProfileModule } from '../profile/profile.module';
import { FriendsService } from '../__services/friends.service';
import { InviteService } from '../__services/invite.service';
import { OnlineService } from '../__services/online.service';
import { StopBubblingDirective } from '../__directives/stop-bubbling.directive';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  imports: [
    CommonModule,
    FriendsRoutingModule,
    ProfileModule,
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
  })
  ],
  providers: [
    FriendsService,
    InviteService,
    OnlineService
  ],
  declarations: [
    FriendsRootComponent,
    AllFriendsComponent,
    FriendsOnlineComponent,
    FriendsInviteComponent,
    StopBubblingDirective
  ]
})
export class FriendsModule { }
