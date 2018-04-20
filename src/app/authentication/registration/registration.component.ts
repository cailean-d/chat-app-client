import { I18nService } from '../../_root/service/i18n.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  isDataLoaded: boolean;

  constructor(
    private i18n: I18nService,
    private title: Title
  ) { }

  async ngOnInit() {
    await this.i18n.useLanguage();
    this.isDataLoaded = true;
    this.setTitle();
    this.updateTitleOnLangChange();
  }

  private onFocusField(element: HTMLDivElement): void {
    element.classList.add('focus');
  }

  private onBlurField(element: HTMLDivElement): void {
    element.classList.remove('focus');
  }

  private reg(event: MouseEvent) {
    event.preventDefault();
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
