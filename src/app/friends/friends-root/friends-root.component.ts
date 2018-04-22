import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as SimpleBar from 'simplebar';
import { scrollbarOpt } from '../../__classes/customScrollOptions';
import { I18nService } from '../../_root/service/i18n.service';

@Component({
  selector: 'app-friends-root',
  templateUrl: './friends-root.component.html',
  styleUrls: ['./friends-root.component.scss']
})
export class FriendsRootComponent implements OnInit {

  @ViewChild('friendList') friendList: ElementRef;
  @ViewChild('search') search: ElementRef;

  friendListScroll: HTMLElement;

  constructor(private i18n: I18nService) { }

  ngOnInit() {
    this.customScrollBar();
  }

  customScrollBar(): void {
    SimpleBar.removeObserver();
    const scrollbar = new SimpleBar(this.friendList.nativeElement, scrollbarOpt);
    this.friendListScroll = <HTMLElement> scrollbar.getScrollElement();
  }

  private clearSearchInput(): void {
    this.search.nativeElement.value = '';
    this.search.nativeElement.dispatchEvent(new Event('input'));
  }

}
