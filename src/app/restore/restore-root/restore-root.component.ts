import { Title } from '@angular/platform-browser';
import { I18nService } from '../../_root/service/i18n.service';
import { Component, OnInit } from '@angular/core';
import { LangChangeEvent } from '@ngx-translate/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-restore-root',
  templateUrl: './restore-root.component.html',
  styleUrls: ['./restore-root.component.scss']
})
export class RestoreRootComponent implements OnInit {

  isDataLoaded: boolean;
  form: FormGroup;

  constructor(
    private i18n: I18nService,
    private title: Title,
    private fb: FormBuilder
  ) { }

  async ngOnInit() {
    await this.i18n.useLanguage();
    this.isDataLoaded = true;
    this.setTitle();
    this.updateTitleOnLangChange();
    this.initForm();
  }

  initForm(): void  {
    this.form = this.fb.group({
     email: [null,
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/)
      ]
    ]
    });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.form.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  restore(): void {
  }

  onFocusField(element: HTMLDivElement): void {
    element.classList.add('focus');
  }

  onBlurField(element: HTMLDivElement): void {
    element.classList.remove('focus');
  }

  setTitle(): void {
    this.i18n.translate.get('form.title.restore_access').subscribe((res: string) => {
      this.title.setTitle(res);
    });

  }

  updateTitleOnLangChange(): void {
    this.i18n.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setTitle();
    });
  }


}
