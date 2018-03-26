import { I18nService } from '../../_root/service/i18n.service';
import { Component, OnInit } from '@angular/core';
import { NgForage } from 'ngforage';
import { Router } from '@angular/router';

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
    private i18n: I18nService
  ) { }

  async ngOnInit() {
    await this.i18n.useLanguage();
    this.isDataLoaded = true;
  }

  async login(event: Event): Promise <void> {
    event.preventDefault();
    await this.storage.setItem('user', true);
    this.router.navigate(['template']);
  }

  onFocusField(element: HTMLDivElement): void {
    element.classList.add('focus');
  }

  onBlurField(element: HTMLDivElement): void {
    element.classList.remove('focus');
  }

}
