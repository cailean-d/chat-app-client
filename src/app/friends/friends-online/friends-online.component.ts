import { FriendList } from '../_classes/friendList';
import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../_services/friends.service';
import { FriendsRootComponent } from '../friends-root/friends-root.component';

@Component({
  selector: 'app-friends-online',
  templateUrl: './friends-online.component.html',
  styleUrls: ['./friends-online.component.scss']
})
export class FriendsOnlineComponent extends FriendList implements OnInit {

  constructor(
    public friendsService: FriendsService,
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
