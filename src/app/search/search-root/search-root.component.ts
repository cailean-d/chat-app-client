import { LangChangeEvent } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SearchService } from '../../__services/search.service';
import * as SimpleBar from 'simplebar';
import { scrollbarOpt } from '../../__classes/customScrollOptions';
import { I18nService } from '../../__services/i18n.service';

@Component({
  selector: 'app-search-root',
  templateUrl: './search-root.component.html',
  styleUrls: ['./search-root.component.scss']
})
export class SearchRootComponent implements OnInit {

  @ViewChild('search') search: ElementRef;
  @ViewChild('userList') userList: ElementRef;

  dataIsLoaded: boolean;

  private _searchValue: string;
  private userListScroll: HTMLElement;

  constructor(
    public searchService: SearchService,
    private title: Title,
    private i18n: I18nService
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
    this.changeSearchValueOnInput();
    this.setCustomScrollbar();
    this.loadUsersOnScrollDown();
    this.setTitle();
    this.updateTitleOnLangChange();
    this.checkDataLoading();
  }

  private changeSearchValueOnInput(): void {
    this.search.nativeElement.addEventListener('input', () => {
      this.searchValue = this.search.nativeElement.value;
    });
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

}
