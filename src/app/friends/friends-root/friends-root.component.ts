import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as SimpleBar from 'simplebar';

@Component({
  selector: 'app-friends-root',
  templateUrl: './friends-root.component.html',
  styleUrls: ['./friends-root.component.scss']
})
export class FriendsRootComponent implements OnInit {

  @ViewChild('friendList') friendList: ElementRef;
  @ViewChild('search') search: ElementRef;

  friendListScroll: HTMLElement;

  constructor() { }

  private scrollbarOpt = {
    classNames: {
      content: 'custom-content',
      scrollContent: 'custom-scroll-content',
      scrollbar: 'custom-scrollbar',
      track: 'custom-track'
    }
  };

  ngOnInit() {
    SimpleBar.removeObserver();
    const scrollbar = new SimpleBar(this.friendList.nativeElement, this.scrollbarOpt);
    this.friendListScroll = <HTMLElement> scrollbar.getScrollElement();
  }

}
