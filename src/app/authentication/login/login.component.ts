import { I18nService } from '../../_root/service/i18n.service';
import { Component, OnInit } from '@angular/core';
import { NgForage } from 'ngforage';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { LangChangeEvent } from '@ngx-translate/core';
import { AuthService } from '../../_root/service/auth.service';

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
    private title: Title,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    await this.i18n.useLanguage();
    this.isDataLoaded = true;
    this.setTitle();
    this.updateTitleOnLangChange();
  }

  private async login(event: Event): Promise <void> {
    event.preventDefault();
    const form = <HTMLFormElement>event.target;
    const email = form.elements['email'].value;
    const password = form.elements['password'].value;
    try {
      const user = await this.authService.login(email, password);
      await this.storage.setItem('user', user);
      this.router.navigate(['app']);
    } catch (error) {
      console.log(error.toString());
    }
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
