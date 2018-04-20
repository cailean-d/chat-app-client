import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgForage } from 'ngforage';

@Injectable()
export class I18nService {

  browserLang: string;
  langs: string[];

  constructor(
    public translate: TranslateService,
    private storage: NgForage,
  ) {
    this.translate.addLangs(['ru', 'en']);
    this.browserLang = this.translate.getBrowserLang();
    this.translate.setDefaultLang('en');
    this.langs = this.translate.getLangs();
  }

  async switchLanguage(lang: string): Promise <void> {
    if (this.langs.includes(lang)) {
      this.translate.use(lang);
      await this.storage.setItem('lang', lang);
    }
  }

  async useLanguage(): Promise <void> {

    const language: string = await this.storage.getItem<string>('lang');

    if (language) {
      this.switchLanguage(language);
    } else if (this.browserLang) {
      this.switchLanguage(this.browserLang);
    }
  }

}
