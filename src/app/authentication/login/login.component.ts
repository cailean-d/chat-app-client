import { Component, OnInit } from '@angular/core';
import { NgForage } from 'ngforage';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private storage: NgForage,
    private router: Router,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('en');
    let browserLang = translate.getBrowserLang();
    // translate.use(browserLang.match(/en|ru/) ? browserLang : 'en');
    translate.use('en');
  }

  ngOnInit() {}

  async login(event: Event): Promise <void> {
    event.preventDefault();
    await this.storage.setItem('user', true);
    this.router.navigate(['app']);
  }

  onFocusField(element: HTMLDivElement): void {
    element.classList.add('focus');
  }

  onBlurField(element: HTMLDivElement): void {
    element.classList.remove('focus');
  }

}
