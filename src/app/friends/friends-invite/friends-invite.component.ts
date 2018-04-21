import { FriendList } from '../_classes/friendList';
import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../_services/friends.service';
import { FriendsRootComponent } from '../friends-root/friends-root.component';
import { InviteService } from '../../__services/invite.service';

@Component({
  selector: 'app-friends-invite',
  templateUrl: './friends-invite.component.html',
  styleUrls: ['./friends-invite.component.scss']
})
export class FriendsInviteComponent extends FriendList implements OnInit {

  constructor(
    public friendsService: FriendsService,
    public inviteService: InviteService,
    protected friendsRoot: FriendsRootComponent
  ) {
    super();
  }

  protected searchInput: HTMLInputElement = this.friendsRoot.search.nativeElement;

  ngOnInit() {
    this.clearSearchField();
    this.updateSearchOnInput();
  }

  rejectFriendship(index: number): void {
    this.inviteService.deleteInvite(index);
  }

}
