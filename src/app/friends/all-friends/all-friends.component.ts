import { Title } from '@angular/platform-browser';
import { FriendList } from '../_classes/friendList';
import { Component, OnInit } from '@angular/core';
import { FriendsRootComponent } from '../friends-root/friends-root.component';
import { FriendsService } from '../../__services/friends.service';
import { LangChangeEvent } from '@ngx-translate/core';
import { I18nService } from '../../__services/i18n.service';

@Component({
  selector: 'app-all-friends',
  templateUrl: './all-friends.component.html',
  styleUrls: ['./all-friends.component.scss']
})
export class AllFriendsComponent extends FriendList implements OnInit {

  constructor(
    public friendsService: FriendsService,
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

  private deleteFriend(index: number): void {
    this.friendsService.deleteFriend(index);
  }

  private setTitle(): void {
    this.i18n.translate.get('title.all_friends').subscribe((res: string) => {
      this.title.setTitle(res);
    });

  }

  private updateTitleOnLangChange(): void {
    this.i18n.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setTitle();
    });
  }

}
