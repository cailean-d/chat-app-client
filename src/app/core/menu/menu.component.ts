import { Title } from '@angular/platform-browser';
import { I18nService } from '../../_root/service/i18n.service';
import { Component, OnInit } from '@angular/core';
import { NgForage } from 'ngforage';
import { FriendsService } from '../../friends/_services/friends.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  links: NodeListOf<HTMLElement>;
  activeBlock: HTMLElement;
  showLanguage: boolean;

  constructor(
    protected storage: NgForage,
    public friendService: FriendsService,
    private i18n: I18nService,
  ) { }

  ngOnInit() {
    this.getLinks();
    this.getActiveBlock();
    this.moveActiveBlockOnClick();
  }

  private async logout() {
    await this.storage.removeItem('user');
  }

  private deleteActiveClass(): void {
    for (let i = 0; i < this.links.length; i++) {
      const element = this.links[i];
      element.classList.remove('link-active');
    }
  }

  private getLinks(): void {
    this.links = <NodeListOf<HTMLElement>> document.querySelectorAll('.link');
  }

  private getActiveBlock(): void {
    this.activeBlock = <HTMLElement> document.querySelector('.active-block');
  }

  private moveActiveBlockOnClick(): void {
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

  private moveActiveBlock(el: HTMLElement): void {
    this.activeBlock.style.top = el.offsetTop + 'px';
  }

  private activateLinkIfHasClass(el: HTMLElement): void {
    setTimeout(() => {
      if (el.classList.contains('link-active')) {
        this.moveActiveBlock(el);
      }
    }, 0);
  }

  private toggleLanguageVisibility(): void {
    this.showLanguage = !this.showLanguage;
  }

  private async changeLangToRus(): Promise<void> {
    await this.i18n.switchLanguage('ru');
    this.showLanguage = false;
  }

  private async changeLangToEn(): Promise<void> {
    await this.i18n.switchLanguage('en');
    this.showLanguage = false;
  }

}
