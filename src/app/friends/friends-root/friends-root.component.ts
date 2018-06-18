import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as SimpleBar from 'simplebar';
import { scrollbarOpt } from '../../__classes/customScrollOptions';
import { I18nService } from '../../__services/i18n.service';
import { FriendsService } from '../../__services/friends.service';
import { InviteService } from '../../__services/invite.service';
import { OnlineService } from '../../__services/online.service';
import { Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-friends-root',
  templateUrl: './friends-root.component.html',
  styleUrls: ['./friends-root.component.scss']
})
export class FriendsRootComponent implements OnInit {

  showMenu = true;
  showMain = true;
  private hideMenuWidth = 800;

  @ViewChild('friendList') friendList: ElementRef;
  @ViewChild('search') search: ElementRef;

  friendListScroll: HTMLElement;

  constructor(
    private i18n: I18nService,
    public friendsService: FriendsService,
    public inviteService: InviteService,
    public onlineService: OnlineService,
    private router: Router
  ) { }

  ngOnInit() {
    this.customScrollBar();
    this.responsive();
  }

  customScrollBar(): void {
    SimpleBar.removeObserver();
    const scrollbar = new SimpleBar(this.friendList.nativeElement, scrollbarOpt);
    this.friendListScroll = <HTMLElement> scrollbar.getScrollElement();
  }

  private clearSearchInput(): void {
    this.search.nativeElement.value = '';
    this.search.nativeElement.dispatchEvent(new Event('input'));
  }

  getMenuStyle(): string {
    if (this.showMenu) {
      return 'flex';
    } else {
      return 'none';
    }
  }

  getMainStyle(): string {
    if (this.showMain) {
      return 'block';
    } else {
      return 'none';
    }
  }

  responsive(): void {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (/user\/\d+$/.test(val.url) && window.innerWidth <= this.hideMenuWidth) {
          this.showMenu = false;
          this.showMain = true;
        } else if (window.innerWidth <= this.hideMenuWidth) {
          this.showMenu = true;
          this.showMain = false;
        } else {
          this.showMenu = true;
          this.showMain = true;
        }
      }
    });

    if (/user\/\d+$/.test(this.router.url) && window.innerWidth <= this.hideMenuWidth) {
      this.showMenu = false;
      this.showMain = true;
    } else if (window.innerWidth <= this.hideMenuWidth) {
      this.showMenu = true;
      this.showMain = false;
    } else {
      this.showMenu = true;
      this.showMain = true;
    }

    window.addEventListener('resize', () => {
      if (/user\/\d+$/.test(this.router.url) && window.innerWidth <= this.hideMenuWidth) {
        this.showMenu = false;
        this.showMain = true;
      } else if (window.innerWidth <= this.hideMenuWidth) {
        this.showMenu = true;
        this.showMain = false;
      } else {
        this.showMenu = true;
        this.showMain = true;
      }
    });

  }

}
