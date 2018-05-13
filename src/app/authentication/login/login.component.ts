import { I18nService } from '../../_root/service/i18n.service';
import { Component, OnInit } from '@angular/core';
import { NgForage } from 'ngforage';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { LangChangeEvent } from '@ngx-translate/core';
import { AuthService } from '../../_root/service/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isDataLoaded: boolean;
  form: FormGroup;

  constructor(
    private storage: NgForage,
    private router: Router,
    private i18n: I18nService,
    private title: Title,
    private authService: AuthService,
    private fb: FormBuilder
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
      console.log(error.toString());
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
