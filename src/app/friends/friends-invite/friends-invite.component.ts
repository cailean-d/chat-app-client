import { LangChangeEvent } from '@ngx-translate/core';
import { FriendList } from '../_classes/friendList';
import { Component, OnInit } from '@angular/core';
import { FriendsRootComponent } from '../friends-root/friends-root.component';
import { InviteService } from '../../__services/invite.service';
import { I18nService } from '../../_root/service/i18n.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-friends-invite',
  templateUrl: './friends-invite.component.html',
  styleUrls: ['./friends-invite.component.scss']
})
export class FriendsInviteComponent extends FriendList implements OnInit {

  constructor(
    public inviteService: InviteService,
    protected friendsRoot: FriendsRootComponent,
    private i18n: I18nService,
    private title: Title
  ) {
    super();
  }

  protected searchInput: HTMLInputElement = this.friendsRoot.search.nativeElement;

  ngOnInit() {
    this.clearSearchField();
    this.updateSearchOnInput();
    this.setTitle();
    this.updateTitleOnLangChange();
  }

  rejectFriendship(index: number): void {
    this.inviteService.deleteInvite(index);
  }

  private setTitle(): void {
    this.i18n.translate.get('title.invites').subscribe((res: string) => {
      this.title.setTitle(res);
    });

  }

  private updateTitleOnLangChange(): void {
    this.i18n.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setTitle();
    });
  }


}
