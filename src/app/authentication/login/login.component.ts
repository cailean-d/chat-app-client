import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForage } from 'ngforage';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { LangChangeEvent } from '@ngx-translate/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PopupMessageComponent } from '../../notification/popup-message/popup-message.component';
import { I18nService } from '../../__services/i18n.service';
import { AuthService } from '../../__services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isDataLoaded: boolean;
  form: FormGroup;
  @ViewChild(PopupMessageComponent) notification: PopupMessageComponent;

  constructor(
    private storage: NgForage,
    private router: Router,
    private i18n: I18nService,
    private title: Title,
    private authService: AuthService,
    private fb: FormBuilder,
  ) { }

  async ngOnInit() {
    await this.i18n.useLanguage();
    this.isDataLoaded = true;
    this.setTitle();
    this.updateTitleOnLangChange();
    this.initForm();
  }

  private async login(): Promise <void> {
    const email = this.form.controls['email'].value;
    const password = this.form.controls['password'].value;
    try {
      const user = await this.authService.login(email, password);
      await this.storage.setItem('user', user);
      this.router.navigate(['app']);
    } catch (error) {
      const err = error.toString() as string;
      const msg = err.slice(7, err.length);
      this.notification.showPopup(msg);
    }
  }

  initForm(): void  {
    this.form = this.fb.group({
     email: [null,
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/)
      ]
    ],
     password: [null,
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]
    ]
    });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.form.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  private onFocusField(element: HTMLDivElement): void {
    element.classList.add('focus');
  }

  private onBlurField(element: HTMLDivElement): void {
    element.classList.remove('focus');
  }

  private setTitle(): void {
    this.i18n.translate.get('form.title.authorization').subscribe((res: string) => {
      this.title.setTitle(res);
    });

  }

  private updateTitleOnLangChange(): void {
    this.i18n.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setTitle();
    });
  }

}
