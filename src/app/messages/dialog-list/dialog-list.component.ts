import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { scrollbarOpt } from '../../__classes/customScrollOptions';
import { ChatsService } from '../../__services/chats.service';
import * as SimpleBar from 'simplebar';
import { I18nService } from '../../__services/i18n.service';

@Component({
  selector: 'app-dialog-list',
  templateUrl: './dialog-list.component.html',
  styleUrls: ['./dialog-list.component.scss']
})
export class DialogListComponent implements OnInit {

  @ViewChild('search') search: ElementRef;
  @ViewChild('chatList') chatList: ElementRef;

  private _searchValue: string;

  constructor(
    protected chatService: ChatsService,
    private i18n: I18nService
  ) { }

  get searchValue(): string {
    return this._searchValue;
  }

  set searchValue(value: string) {
    this._searchValue = value;
    this.chatService.search = this.searchValue;
  }

  ngOnInit() {
    this.searchValue = '';
    this.changeSearchValueOnInput();
    this.setCustomScrollbar();
  }

  changeSearchValueOnInput(): void {
    this.search.nativeElement.addEventListener('input', () => {
      this.searchValue = this.search.nativeElement.value;
    });
  }

  setCustomScrollbar(): void {
    SimpleBar.removeObserver();
    const scrollbar = new SimpleBar(this.chatList.nativeElement, scrollbarOpt);
  }

  clearSearchInput(): void {
    this.search.nativeElement.value = '';
    this.searchValue = '';
  }

}
