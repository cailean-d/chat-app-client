import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { RootComponent } from './root/root.component';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
  ],
  declarations: [HeaderComponent, MenuComponent, RootComponent]
})
export class CoreModule { }
