import { I18nService } from '../../_root/service/i18n.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LangChangeEvent } from '@ngx-translate/core';
import { AuthService } from '../../_root/service/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  isDataLoaded: boolean;
  form: FormGroup;

  constructor(
    private i18n: I18nService,
    private title: Title,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  async ngOnInit() {
    await this.i18n.useLanguage();
    this.isDataLoaded = true;
    this.setTitle();
    this.updateTitleOnLangChange();
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      nickname: [null,
        [
          Validators.required,
          Validators.pattern(/^[A-Za-zА-Яа-я\s-_]+[0-9]*$/),
          Validators.minLength(3),
          Validators.maxLength(30)
        ]
      ],
       email: [null,
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/)
        ]
      ],
      passwords: this.fb.group({
        password: [null,
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30)
          ]
          ],
        confirm_password: [null,
          [
            Validators.required
          ]
        ]
      }, {validator: (group: FormGroup) => {

        const pass1 = group.controls['password'].value;
        const pass2 = group.controls['confirm_password'].value;

        if (pass1 !== pass2) {
          return {mismatch: true};
        } else {
          return false;
        }

      }})
    });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.form.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  isSubControlInvalid(controlName: string): boolean {
    const passwords = this.form.controls['passwords'] as FormGroup;
    const control = passwords.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  private onFocusField(element: HTMLDivElement): void {
    element.classList.add('focus');
  }

  private onBlurField(element: HTMLDivElement): void {
    element.classList.remove('focus');
  }

  private async reg(): Promise<void> {
    const nickname = this.form.controls['nickname'].value;
    const email = this.form.controls['email'].value;
    const password = this.form.controls['password'].value;
    try {
      await this.authService.regUser(nickname, email, password);
      this.router.navigate(['authe/login']);
    } catch (error) {
      console.log(error.toString());
    }
  }

  private setTitle(): void {
    this.i18n.translate.get('form.title.registration').subscribe((res: string) => {
      this.title.setTitle(res);
    });

  }

  private updateTitleOnLangChange(): void {
    this.i18n.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setTitle();
    });
  }

}
