import { I18nService } from '../../_root/service/i18n.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LangChangeEvent } from '@ngx-translate/core';
import { AuthService } from '../../_root/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  isDataLoaded: boolean;

  constructor(
    private i18n: I18nService,
    private title: Title,
    private authService: AuthService,
    private router: Router
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

  private async reg(event: Event) {
    event.preventDefault();
    const form = <HTMLFormElement>event.target;
    const nickname = form.elements['nickname'].value;
    const email = form.elements['email'].value;
    const password = form.elements['password'].value;
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
