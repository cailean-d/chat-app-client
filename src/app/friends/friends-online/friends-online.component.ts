import { Component, OnInit, ElementRef } from '@angular/core';
import { FriendsService } from '../services/friends.service';
import { FriendsRootComponent } from '../friends-root/friends-root.component';
import { Friend } from '../classes/friend';

@Component({
  selector: 'app-friends-online',
  templateUrl: './friends-online.component.html',
  styleUrls: ['./friends-online.component.scss']
})
export class FriendsOnlineComponent implements OnInit {

  constructor(
    private friendsService: FriendsService,
    private friendsRoot: FriendsRootComponent
  ) { }

  friends: Friend[] = this.friendsService.friendsOnline;
  searchInput: HTMLInputElement = this.friendsRoot.search.nativeElement;

  ngOnInit() {
    this.clearSearchField();
    this.searchInput.addEventListener('input', () => {
      this.updateSearch();
    });
    this.friendsService.on('update', () => {
      this.updateList();
    });
  }

  clearSearchField() {
    this.friendsService.search = '';
    this.searchInput.value = '';
    this.scrollToTop();
  }

  scrollToTop(): void {
    this.friendsRoot.friendListScroll.scrollTop = 0;
  }

  updateSearch(): void {
    this.friendsService.search = this.searchInput.value;
  }

  updateList(): void {
    this.friends = this.friendsService.friendsOnline;
  }

}
