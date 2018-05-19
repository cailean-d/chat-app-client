import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnProfileRoutingModule } from './own-profile-routing.module';
import { ProfileRootComponent } from './profile-root/profile-root.component';
import { I18nModule } from '../i18n/i18n.module';

@NgModule({
  imports: [
    CommonModule,
    OwnProfileRoutingModule,
    I18nModule
  ],
  declarations: [ProfileRootComponent]
})
export class OwnProfileModule { }
