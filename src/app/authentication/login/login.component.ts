import { I18nService } from '../../_root/service/i18n.service';
import { Component, OnInit } from '@angular/core';
import { NgForage } from 'ngforage';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isDataLoaded: boolean;

  constructor(
    private storage: NgForage,
    private router: Router,
    private i18n: I18nService,
    private title: Title
  ) { }

  async ngOnInit() {
    await this.i18n.useLanguage();
    this.isDataLoaded = true;
    this.setTitle();
    this.updateTitleOnLangChange();
  }

  async login(event: Event): Promise <void> {
    event.preventDefault();
    await this.storage.setItem('user', true);
    this.router.navigate(['app']);
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
