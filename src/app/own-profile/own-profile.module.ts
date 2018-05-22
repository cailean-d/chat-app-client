import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnProfileRoutingModule } from './own-profile-routing.module';
import { ProfileRootComponent } from './profile-root/profile-root.component';
import { I18nModule } from '../i18n/i18n.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    OwnProfileRoutingModule,
    I18nModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ProfileRootComponent]
})
export class OwnProfileModule { }
