import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as SimpleBar from 'simplebar';
import { FriendsService } from '../services/friends.service';

@Component({
  selector: 'app-friends-root',
  templateUrl: './friends-root.component.html',
  styleUrls: ['./friends-root.component.scss']
})
export class FriendsRootComponent implements OnInit {

  @ViewChild('friendList') friendList: ElementRef;

  constructor(private friendsService: FriendsService) { }

  scrollbarOpt = {
    classNames: {
      content: 'custom-content',
      scrollContent: 'custom-scroll-content',
      scrollbar: 'custom-scrollbar',
      track: 'custom-track'
    }
  };

  friendsTemp = this.friendsService.friends;

  filteredFriends = this.friendsTemp;

  ngOnInit() {
    SimpleBar.removeObserver();
    const scrollbar = new SimpleBar(this.friendList.nativeElement, this.scrollbarOpt);
  }

  filterFriends(event: Event): void {
    const search = <HTMLInputElement> event.target;
    this.filteredFriends = this.friendsTemp.filter((item) => {
      return item.name.match(new RegExp(search.value, 'i'));
    });
  }

  friendsOnline(event: Event): void {
    const element: HTMLElement = event.target as HTMLElement;
    this.filteredFriends = this.friendsService.getOnlineFriends();
    this.changeActiveButton(element, 'button-active');
  }

  getAllFriends(event: Event): void {
    const element: HTMLElement = event.target as HTMLElement;
    this.filteredFriends = this.friendsTemp;
    this.changeActiveButton(element, 'button-active');
  }

  getFavoriteFriends (event: Event): void {
    const element: HTMLElement = event.target as HTMLElement;
    this.filteredFriends = this.friendsService.getFavoriteFriends();
    this.changeActiveButton(element, 'button-active');
  }

  removeClassFromSibling(el: HTMLElement, classStr: string): void {
    const parent = el.parentNode.parentNode;
    const children = parent.childNodes;
    for (let i = 0; i < children.length; i++) {
      const element: Node = children[i];
      if (element.nodeName !== '#text') {
        (element as HTMLElement).classList.remove(classStr);
      }
    }
  }

  addClass (el: HTMLElement, classStr: string) {
    (el.parentNode as HTMLElement).classList.add(classStr);
  }

  changeActiveButton (el: HTMLElement, classStr: string) {
    this.removeClassFromSibling(el, classStr);
    this.addClass(el, classStr);
  }

}
