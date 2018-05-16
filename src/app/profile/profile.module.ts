import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { MainComponent } from './main/main.component';
import { UserComponent } from './user/user.component';
import { ProfileService } from '../__services/profile.service';
import { FavoriteService } from '../__services/favorite.service';
import { FriendsService } from '../__services/friends.service';
import { InviteService } from '../__services/invite.service';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
  })
  ],
  declarations: [MainComponent, UserComponent],
  exports: [
    MainComponent,
    UserComponent
  ],
  providers: [
    ProfileService,
    FavoriteService
  ]
})
export class ProfileModule { }
