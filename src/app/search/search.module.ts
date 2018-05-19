import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchRootComponent } from './search-root/search-root.component';
import { ProfileModule } from '../profile/profile.module';
import { I18nModule } from '../i18n/i18n.module';

@NgModule({
  imports: [
    CommonModule,
    SearchRoutingModule,
    ProfileModule,
    I18nModule
  ],
  declarations: [SearchRootComponent],
  providers: []
})
export class SearchModule { }
