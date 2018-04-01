import { FriendList } from '../classes/friendList';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FriendsService } from '../services/friends.service';
import { FriendsRootComponent } from '../friends-root/friends-root.component';

@Component({
  selector: 'app-friends-online',
  templateUrl: './friends-online.component.html',
  styleUrls: ['./friends-online.component.scss']
})
export class FriendsOnlineComponent extends FriendList implements OnInit {

  constructor(
    protected friendsService: FriendsService,
    protected friendsRoot: FriendsRootComponent
  ) {
    super();
  }

  protected searchInput: HTMLInputElement = this.friendsRoot.search.nativeElement;

  ngOnInit() {
    this.clearSearchField();
    this.updateSearchOnInput();
  }

}
