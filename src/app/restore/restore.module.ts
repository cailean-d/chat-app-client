import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestoreRoutingModule } from './restore-routing.module';
import { RestoreRootComponent } from './restore-root/restore-root.component';

@NgModule({
  imports: [
    CommonModule,
    RestoreRoutingModule
  ],
  declarations: [RestoreRootComponent]
})
export class RestoreModule { }
