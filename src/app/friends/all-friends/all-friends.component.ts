import { Title } from '@angular/platform-browser';
import { FriendList } from '../_classes/friendList';
import { Component, OnInit } from '@angular/core';
import { FriendsRootComponent } from '../friends-root/friends-root.component';
import { FriendsService } from '../../__services/friends.service';
import { LangChangeEvent } from '@ngx-translate/core';
import { I18nService } from '../../__services/i18n.service';
import { UserInterface } from '../../__interfaces/user';

@Component({
  selector: 'app-all-friends',
  templateUrl: './all-friends.component.html',
  styleUrls: ['./all-friends.component.scss']
})

export class AllFriendsComponent extends FriendList implements OnInit {

  dataIsLoaded: boolean;

  constructor(
    public friendsService: FriendsService,
    protected friendsRoot: FriendsRootComponent,
    private i18n: I18nService,
    private title: Title
  ) {
    super();
  }

  protected searchInput: HTMLInputElement = this.friendsRoot.search.nativeElement;

  async ngOnInit() {
    this.clearSearchField();
    this.updateSearchOnInput();
    this.setTitle();
    this.updateTitleOnLangChange();
    if (this.friendsService.dataIsLoaded) {
      this.dataIsLoaded = true;
    } else {
      this.friendsService.on('DATA_IS_LOADED', () => {
        this.dataIsLoaded = true;
      });
    }
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
