import { LangChangeEvent } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { I18nService } from '../../__services/i18n.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-settings-root',
  templateUrl: './settings-root.component.html',
  styleUrls: ['./settings-root.component.scss']
})
export class SettingsRootComponent implements OnInit {

  showMenu = true;
  showMain = true;
  private hideMenuWidth = 800;

  constructor(
    private i18n: I18nService,
    private title: Title,
    private router: Router
  ) { }

  ngOnInit() {
    this.setTitle();
    this.updateTitleOnLangChange();
    this.responsive();
  }

  private setTitle(): void {
    this.i18n.translate.get('hint.settings').subscribe((res: string) => {
      this.title.setTitle(res);
    });
  }

  private updateTitleOnLangChange(): void {
    this.i18n.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setTitle();
    });
  }

  getMenuStyle(): string {
    if (this.showMenu) {
      return 'flex';
    } else {
      return 'none';
    }
  }

  getMainStyle(): string {
    if (this.showMain) {
      return 'block';
    } else {
      return 'none';
    }
  }

  responsive(): void {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (/messages\/\d+$/.test(val.url) && window.innerWidth <= this.hideMenuWidth) {
          this.showMenu = false;
          this.showMain = true;
        } else if (window.innerWidth <= this.hideMenuWidth) {
          this.showMenu = true;
          this.showMain = false;
        } else {
          this.showMenu = true;
          this.showMain = true;
        }
      }
    });

    if (/messages\/\d+$/.test(this.router.url) && window.innerWidth <= this.hideMenuWidth) {
      this.showMenu = false;
      this.showMain = true;
    } else if (window.innerWidth <= this.hideMenuWidth) {
      this.showMenu = true;
      this.showMain = false;
    } else {
      this.showMenu = true;
      this.showMain = true;
    }

    window.addEventListener('resize', () => {
      if (/messages\/\d+$/.test(this.router.url) && window.innerWidth <= this.hideMenuWidth) {
        this.showMenu = false;
        this.showMain = true;
      } else if (window.innerWidth <= this.hideMenuWidth) {
        this.showMenu = true;
        this.showMain = false;
      } else {
        this.showMenu = true;
        this.showMain = true;
      }
    });

  }



}
