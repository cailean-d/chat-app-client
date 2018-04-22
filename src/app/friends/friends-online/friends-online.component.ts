import { I18nService } from '../../_root/service/i18n.service';
import { OnlineService } from '../../__services/online.service';
import { FriendList } from '../_classes/friendList';
import { Component, OnInit } from '@angular/core';
import { FriendsRootComponent } from '../friends-root/friends-root.component';
import { Title } from '@angular/platform-browser';
import { LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-friends-online',
  templateUrl: './friends-online.component.html',
  styleUrls: ['./friends-online.component.scss']
})
export class FriendsOnlineComponent extends FriendList implements OnInit {

  constructor(
    protected friendsRoot: FriendsRootComponent,
    protected onlineService: OnlineService,
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

  private setTitle(): void {
    this.i18n.translate.get('title.friend_online').subscribe((res: string) => {
      this.title.setTitle(res);
    });

  }

  private updateTitleOnLangChange(): void {
    this.i18n.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setTitle();
    });
  }


}
