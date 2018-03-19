import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnProfileRoutingModule } from './own-profile-routing.module';
import { ProfileRootComponent } from './profile-root/profile-root.component';

@NgModule({
  imports: [
    CommonModule,
    OwnProfileRoutingModule
  ],
  declarations: [ProfileRootComponent]
})
export class OwnProfileModule { }
