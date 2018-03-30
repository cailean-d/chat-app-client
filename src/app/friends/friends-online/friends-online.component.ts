import { Component, OnInit, ElementRef } from '@angular/core';
import { FriendsService } from '../services/friends.service';
import { FriendsRootComponent } from '../friends-root/friends-root.component';

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

  friends = this.friendsService.friendsOnline;
  friendsAll = this.friendsService.friendsOnline;
  searchField: ElementRef = this.friendsRoot.search;

  ngOnInit() {
    this.clearSearchField();
    this.searchField.nativeElement.addEventListener('input', () => {
      this.getFilteredFriends();
    });
  }

  getFilteredFriends (): void {
    const filter: string = this.searchField.nativeElement.value;
    this.friends = this.friendsService.getFilteredOnlineFriends(filter);
  }

  clearSearchField () {
    this.searchField.nativeElement.value = '';
  }

}
