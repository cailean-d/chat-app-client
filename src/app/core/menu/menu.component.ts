import { OwnProfileService } from '../../__services/own-profile.service';
import { LangChangeEvent } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { NgForage } from 'ngforage';
import { InviteService } from '../../__services/invite.service';
import { Router } from '@angular/router';
import { I18nService } from '../../__services/i18n.service';
import { AuthService } from '../../__services/auth.service';
import { UserInterface } from '../../__interfaces/user';
import { SocketService } from '../../__services/socket.service';
import { ProfileService } from '../../__services/profile.service';
import { ChatsService } from '../../__services/chats.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  subscription: any;

  links: NodeListOf<HTMLElement>;
  avatar_link: HTMLElement;
  search_link: HTMLElement;
  message_link: HTMLElement;

  activeBlock: HTMLElement;
  showLanguage: boolean;
  invitesCount: number;
  avatar = '/assets/images/default-user.png';

  constructor(
    protected storage: NgForage,
    public inviteService: InviteService,
    private i18n: I18nService,
    private title: Title,
    private authService: AuthService,
    private router: Router,
    private profile: OwnProfileService,
    private socket: SocketService,
    private profileService: ProfileService,
    private chatsService: ChatsService
  ) { }

  ngOnInit() {
    this.getLinks();
    this.getActiveBlock();
    this.moveActiveBlockOnClick();
    this.updateInviteCount();
    this.getAvatar();
    this.moveLink();
  }

  async logout(): Promise <void> {
    try {
      this.router.navigate(['authe/login']);
      await this.authService.logout();
      await this.storage.removeItem('user');
      this.profile.dataIsLoaded = false;
      this.socket.disconnect();
    } catch (error) {
      console.log(error.toString());
    }
  }

  deleteActiveClass(): void {
    for (let i = 0; i < this.links.length; i++) {
      const element = this.links[i];
      element.classList.remove('link-active');
    }
  }

  getLinks(): void {
    this.links = <NodeListOf<HTMLElement>> document.querySelectorAll('.__link');
    this.avatar_link = <HTMLElement> document.querySelector('.avatar');
    this.search_link = <HTMLElement> document.querySelector('.__search');
    this.message_link = <HTMLElement> document.querySelector('.__message');
  }

  getActiveBlock(): void {
    this.activeBlock = <HTMLElement> document.querySelector('.active-block');
  }

  moveActiveBlockOnClick(): void {
    for (let i = 0; i < this.links.length; i++) {
      const element = this.links[i];
      this.activateLinkIfHasClass(element);
      element.onclick = () => {
        this.deleteActiveClass();
        element.classList.add('link-active');
        this.moveActiveBlock(element);
      };
    }
  }

  moveActiveBlock(el: HTMLElement): void {
    this.activeBlock.style.top = el.offsetTop + 'px';
  }

  activateLinkIfHasClass(el: HTMLElement): void {
    setTimeout(() => {
      if (el.classList.contains('link-active')) {
        this.moveActiveBlock(el);
        this.activeBlock.style.display = 'block';
      }
    }, 0);
  }

  toggleLanguageVisibility(): void {
    this.showLanguage = !this.showLanguage;
  }

  async changeLangToRus(): Promise<void> {
    await this.i18n.switchLanguage('ru');
    this.showLanguage = false;
  }

  async changeLangToEn(): Promise<void> {
    await this.i18n.switchLanguage('en');
    this.showLanguage = false;
  }

  changeSearchTitle(): void {
    this.i18n.translate.get('hint.search').subscribe((res: string) => {
      this.title.setTitle(res);
    });
  }

  changeFriendsTitle(): void {
    this.i18n.translate.get('hint.friends').subscribe((res: string) => {
      this.title.setTitle(res);
    });
  }

  changeFavoriteTitle(): void {
    this.i18n.translate.get('hint.favorite').subscribe((res: string) => {
      this.title.setTitle(res);
    });
  }

  changeChatsTitle(): void {
    this.i18n.translate.get('hint.chats').subscribe((res: string) => {
      this.title.setTitle(res);
    });
  }

  changeSettingsTitle(): void {
    this.i18n.translate.get('hint.settings').subscribe((res: string) => {
      this.title.setTitle(res);
    });
  }

  updateInviteCount(): void {
    this.inviteService.countCast.subscribe(count => this.invitesCount = count);
  }

  getAvatar() {
    this.avatar = this.profile.user.avatar;
  }

  moveLink(): void {
    this.profileService.on('LOAD_USER', () => {
      this.moveActiveBlock(this.search_link);
    });
    this.profile.on('LOAD_USER', () => {
      this.moveActiveBlock(this.avatar_link);
    });
    this.chatsService.on('OPEN_CHAT', () => {
      this.moveActiveBlock(this.message_link);
    });
  }

}
