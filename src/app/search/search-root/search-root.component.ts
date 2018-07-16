import { LangChangeEvent } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SearchService } from '../../__services/search.service';
import * as SimpleBar from 'simplebar';
import { scrollbarOpt } from '../../__classes/customScrollOptions';
import { I18nService } from '../../__services/i18n.service';
import { Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-search-root',
  templateUrl: './search-root.component.html',
  styleUrls: ['./search-root.component.scss']
})
export class SearchRootComponent implements OnInit {

  showMenu = true;
  showMain = true;

  @ViewChild('search') search: ElementRef;
  @ViewChild('userList') userList: ElementRef;

  dataIsLoaded: boolean;

  private _searchValue: string;
  private userListScroll: HTMLElement;
  private hideMenuWidth = 800;

  constructor(
    public searchService: SearchService,
    private title: Title,
    private i18n: I18nService,
    private router: Router,
  ) { }

  get searchValue(): string {
    return this._searchValue;
  }

  set searchValue(value: string) {
    this._searchValue = value;
    this.searchService.search = this.searchValue;
    this.search.nativeElement.value = value;
  }

  ngOnInit() {
    this.setCustomScrollbar();
    this.loadUsersOnScrollDown();
    this.setTitle();
    this.updateTitleOnLangChange();
    this.checkDataLoading();
    this.responsive();
  }

  public changeSearchValueOnInput(event: Event): void {
    this.searchValue = (event.target as HTMLInputElement).value;
  }

  private setCustomScrollbar(): void {
    SimpleBar.removeObserver();
    const scrollbar = new SimpleBar(this.userList.nativeElement, scrollbarOpt);
    this.userListScroll = <HTMLElement> scrollbar.getScrollElement();
  }

  private loadUsersOnScrollDown(): void {
    this.userListScroll.addEventListener('wheel', (e: WheelEvent) => {
      const scroll = this.userListScroll.scrollTop + this.userListScroll.clientHeight;
      const height = this.userListScroll.scrollHeight;
      if (scroll + 20 >= height) {
        this.searchService.oldSearch = this.search.nativeElement.value;
        this.searchService.loadUsers();
      }
    });
  }

  private clearSearchInput(): void {
    this.searchValue = '';
  }

  private setTitle(): void {
    this.i18n.translate.get('title.search').subscribe((res: string) => {
      this.title.setTitle(res);
    });

  }

  private updateTitleOnLangChange(): void {
    this.i18n.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setTitle();
    });
  }

  private checkDataLoading(): void {
    if (this.searchService.dataIsLoaded) {
      this.dataIsLoaded = true;
    } else {
      this.searchService.on('DATA_IS_LOADED', () => {
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
