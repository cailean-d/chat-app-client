import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { MenuComponent } from './menu/menu.component';
import { RootComponent } from './root/root.component';
import { FriendsService } from '../friends/_services/friends.service';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
  ],
  declarations: [
    MenuComponent,
    RootComponent
  ],
  providers: [
    FriendsService
  ]
})
export class CoreModule { }
