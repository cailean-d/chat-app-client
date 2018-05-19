import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthService } from '../__services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationModule } from '../notification/notification.module';
import { I18nModule } from '../i18n/i18n.module';

@NgModule({
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NotificationModule,
    I18nModule
  ],
  declarations: [
    LoginComponent,
    RegistrationComponent
  ],
  providers: [
    AuthService
  ]
})
export class AuthenticationModule { }
