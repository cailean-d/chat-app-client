import { LangChangeEvent } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { I18nService } from '../../_root/service/i18n.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SearchService } from '../../__services/search.service';
import * as SimpleBar from 'simplebar';
import { scrollbarOpt } from '../../__classes/customScrollOptions';

@Component({
  selector: 'app-search-root',
  templateUrl: './search-root.component.html',
  styleUrls: ['./search-root.component.scss']
})
export class SearchRootComponent implements OnInit {

  @ViewChild('search') search: ElementRef;
  @ViewChild('userList') userList: ElementRef;

  private _searchValue: string;
  private userListScroll: HTMLElement;

  constructor(
    protected searchService: SearchService,
    private title: Title,
    private i18n: I18nService
  ) { }

  get searchValue(): string {
    return this._searchValue;
  }

  set searchValue(value: string) {
    this._searchValue = value;
    this.searchService.search = this.searchValue;
  }

  ngOnInit() {
    this.searchValue = '';
    this.changeSearchValueOnInput();
    this.setCustomScrollbar();
    this.loadUsersOnScrollDown();
    this.setTitle();
    this.updateTitleOnLangChange();
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
        if (this.searchValue === '') {
          this.searchService.loadUsers();
        } else {
          this.searchService.loadFilteredUsers();
        }
      }
    });
  }

  private clearSearchInput(): void {
    this.search.nativeElement.value = '';
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

}
