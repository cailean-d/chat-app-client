import { OwnProfileService } from '../../__services/own-profile.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { scrollbarOpt } from '../../__classes/customScrollOptions';
import { ChatsService } from '../../__services/chats.service';
import * as SimpleBar from 'simplebar';
import { I18nService } from '../../__services/i18n.service';
import { FriendsService } from '../../__services/friends.service';
import { UserInterface } from '../../__interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-list',
  templateUrl: './dialog-list.component.html',
  styleUrls: ['./dialog-list.component.scss']
})
export class DialogListComponent implements OnInit {

  @ViewChild('search') search: ElementRef;
  @ViewChild('chatList') chatList: ElementRef;

  private _searchValue: string;
  dataIsLoaded: boolean;
  showAddList: boolean;
  userList = [this.profile.user.id];
  chatIsExist: boolean;
  existedChat: number;
  roomTitle: string;

  constructor(
    protected chatService: ChatsService,
    private i18n: I18nService,
    protected friendsService: FriendsService,
    private profile: OwnProfileService,
    private router: Router
  ) { }

  get searchValue(): string {
    return this._searchValue;
  }

  set searchValue(value: string) {
    this._searchValue = value;
    this.chatService.search = this.searchValue;
  }

  ngOnInit() {
    this.changeSearchValueOnInput();
    this.setCustomScrollbar();
    this.checkDataLoading();
  }

  changeSearchValueOnInput(): void {
    this.search.nativeElement.addEventListener('input', () => {
      this.searchValue = this.search.nativeElement.value;
    });
  }

  setCustomScrollbar(): void {
    SimpleBar.removeObserver();
    const scrollbar = new SimpleBar(this.chatList.nativeElement, scrollbarOpt);
  }

  clearSearchInput(): void {
    this.search.nativeElement.value = '';
    this.searchValue = '';
  }

  clearTitleInput(): void {
    this.roomTitle = '';
  }

  private checkDataLoading(): void {
    if (this.chatService.dataIsLoaded) {
      this.dataIsLoaded = true;
    } else {
      this.chatService.on('DATA_IS_LOADED', () => {
        this.dataIsLoaded = true;
      });
    }
  }

  closeList(): void {
    this.showAddList = false;
    this.userList = [this.profile.user.id];
    this.chatIsExist = false;
    this.showAddList = false;
  }

  showList(): void {
    this.showAddList = true;
  }

  addUser(e: Event, user: UserInterface): void {
    let friend;
    if ((e.target as HTMLElement).classList.contains('friend')) {
      friend = e.target;
    } else {
      friend = this.findAncestor(e.target, 'friend') as HTMLElement;
    }

    if (friend.classList.contains('link-active')) {
      friend.classList.remove('link-active');
      const i = this.userList.indexOf(user.id);
      this.userList.splice(i, 1);
    } else {
      friend.classList.add('link-active');
      this.userList.push(user.id);
    }

    const res = this.chatService.chatIsExists(this.userList) as any;

    this.chatIsExist = !!res;

    if (Number.isInteger(res)) {
      this.existedChat = res;
    }

  }

  private findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls)) {}
    return el;
  }

  openChat(): void {
    this.router.navigate([`app/messages/${this.existedChat}`]);
    this.userList = [this.profile.user.id];
    this.chatIsExist = false;
    this.showAddList = false;
    this.roomTitle = '';
  }

  createChat(): void {
    if (this.userList.length > 1) {
      this.chatService.createRoom(this.userList, this.roomTitle).then((id) => {
        this.router.navigate([`app/messages/${id}`]);
        this.userList = [this.profile.user.id];
        this.chatIsExist = false;
        this.showAddList = false;
        this.roomTitle = '';
      });
    }
  }


}
