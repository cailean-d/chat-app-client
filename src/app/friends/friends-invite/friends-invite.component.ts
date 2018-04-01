import { FriendList } from '../_classes/friendList';
import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../_services/friends.service';
import { FriendsRootComponent } from '../friends-root/friends-root.component';

@Component({
  selector: 'app-friends-invite',
  templateUrl: './friends-invite.component.html',
  styleUrls: ['./friends-invite.component.scss']
})
export class FriendsInviteComponent extends FriendList implements OnInit {

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
