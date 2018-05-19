import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { MainComponent } from './main/main.component';
import { UserComponent } from './user/user.component';
import { I18nModule } from '../i18n/i18n.module';
import { DatePipe } from '../__pipes/date.pipe';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    I18nModule
  ],
  declarations: [
    MainComponent,
    UserComponent,
    DatePipe
  ],
  exports: [
    MainComponent,
    UserComponent
  ],
  providers: []
})
export class ProfileModule { }
