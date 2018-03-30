import { Component, OnInit, ElementRef } from '@angular/core';
import { FriendsService } from '../services/friends.service';
import { FriendsRootComponent } from '../friends-root/friends-root.component';

@Component({
  selector: 'app-friends-favorite',
  templateUrl: './friends-favorite.component.html',
  styleUrls: ['./friends-favorite.component.scss']
})
export class FriendsFavoriteComponent implements OnInit {

  constructor(
    private friendsService: FriendsService,
    private friendsRoot: FriendsRootComponent
  ) { }

  friends = this.friendsService.friendsFavorite;
  friendsAll = this.friendsService.friendsFavorite;
  searchField: ElementRef = this.friendsRoot.search;

  ngOnInit() {
    this.clearSearchField();
    this.searchField.nativeElement.addEventListener('input', () => {
      this.getFilteredFriends();
    });
  }

  getFilteredFriends (): void {
    const filter: string = this.searchField.nativeElement.value;
    this.friends = this.friendsService.getFilteredFavoriteFriends(filter);
  }

  clearSearchField () {
    this.searchField.nativeElement.value = '';
  }

}
