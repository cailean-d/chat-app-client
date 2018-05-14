import { LangChangeEvent } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { NgForage } from 'ngforage';
import { InviteService } from '../../__services/invite.service';
import { Router } from '@angular/router';
import { I18nService } from '../../__services/i18n.service';
import { AuthService } from '../../__services/auth.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  links: NodeListOf<HTMLElement>;
  activeBlock: HTMLElement;
  showLanguage: boolean;
  invitesCount: number;

  constructor(
    protected storage: NgForage,
    protected inviteService: InviteService,
    private i18n: I18nService,
    private title: Title,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getLinks();
    this.getActiveBlock();
    this.moveActiveBlockOnClick();
    this.updateInviteCount();
  }

  async logout(): Promise <void> {
    try {
      await this.authService.logout();
      await this.storage.removeItem('user');
      this.router.navigate(['authe/login']);
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
    this.links = <NodeListOf<HTMLElement>> document.querySelectorAll('.link');
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
    this.invitesCount = this.inviteService.users.length;
    this.inviteService.on('length_changed', () => {
      this.invitesCount = this.inviteService.users.length;
    });
  }

}
