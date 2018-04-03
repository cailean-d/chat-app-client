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

  constructor(protected searchService: SearchService) { }

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
  }

  changeSearchValueOnInput(): void {
    this.search.nativeElement.addEventListener('input', () => {
      this.searchValue = this.search.nativeElement.value;
    });
  }

  setCustomScrollbar(): void {
    SimpleBar.removeObserver();
    const scrollbar = new SimpleBar(this.userList.nativeElement, scrollbarOpt);
    this.userListScroll = <HTMLElement> scrollbar.getScrollElement();
  }

  loadUsersOnScrollDown(): void {
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

  clearSearchInput(): void {
    this.search.nativeElement.value = '';
    this.searchValue = '';
  }
}
