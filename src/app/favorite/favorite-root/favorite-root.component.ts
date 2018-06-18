import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as SimpleBar from 'simplebar';
import { scrollbarOpt } from '../../__classes/customScrollOptions';
import { FavoriteService } from '../../__services/favorite.service';
import { Title } from '@angular/platform-browser';
import { LangChangeEvent } from '@ngx-translate/core';
import { I18nService } from '../../__services/i18n.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-favorite-root',
  templateUrl: './favorite-root.component.html',
  styleUrls: ['./favorite-root.component.scss']
})
export class FavoriteRootComponent implements OnInit {

  dataIsLoaded: boolean;

  showMenu = true;
  showMain = true;
  private hideMenuWidth = 800;

  @ViewChild('search') search: ElementRef;
  @ViewChild('userList') userList: ElementRef;

  private _searchValue: string;

  constructor(
    protected favoriteService: FavoriteService,
    private i18n: I18nService,
    private title: Title,
    private router: Router
  ) {}

  get searchValue(): string {
    return this._searchValue;
  }

  set searchValue(value: string) {
    this._searchValue = value;
    this.favoriteService.search = this.searchValue;
  }

  ngOnInit() {
    this.changeSearchValueOnInput();
    this.setCustomScrollbar();
    this.setTitle();
    this.updateTitleOnLangChange();
    this.checkDataLoading();
    this.responsive();
  }

  changeSearchValueOnInput(): void {
    this.search.nativeElement.addEventListener('input', () => {
      this.searchValue = this.search.nativeElement.value;
    });
  }

  setCustomScrollbar(): void {
    SimpleBar.removeObserver();
    const scrollbar = new SimpleBar(this.userList.nativeElement, scrollbarOpt);
  }

  clearSearchInput(): void {
    this.search.nativeElement.value = '';
    this.searchValue = '';
  }

  private setTitle(): void {
    this.i18n.translate.get('hint.favorite').subscribe((res: string) => {
      this.title.setTitle(res);
    });

  }

  private updateTitleOnLangChange(): void {
    this.i18n.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setTitle();
    });
  }

  private checkDataLoading(): void {
    if (this.favoriteService.dataIsLoaded) {
      this.dataIsLoaded = true;
    } else {
      this.favoriteService.on('DATA_IS_LOADED', () => {
        this.dataIsLoaded = true;
      });
    }
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
        if (/user\/\d+$/.test(val.url) && window.innerWidth <= this.hideMenuWidth) {
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

    if (/user\/\d+$/.test(this.router.url) && window.innerWidth <= this.hideMenuWidth) {
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
      if (/user\/\d+$/.test(this.router.url) && window.innerWidth <= this.hideMenuWidth) {
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
