import { FriendsService } from '../../__services/friends.service';
import { ProfileService } from '../../__services/profile.service';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as SimpleBar from 'simplebar';
import { scrollbarOpt } from '../../__classes/customScrollOptions';
import { ActivatedRoute, Router } from '@angular/router';
import { LangChangeEvent } from '@ngx-translate/core';
import { I18nService } from '../../__services/i18n.service';
import { NgForage } from 'ngforage';
import { UserInterface } from '../../__interfaces/user';
import { SocketService, SocketAction } from '../../__services/socket.service';
import { OwnProfileService } from '../../__services/own-profile.service';
import { ChatsService } from '../../__services/chats.service';
import { EventEmitter } from 'eventemitter3';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent extends EventEmitter implements OnInit {

  @ViewChild('chat') chat: ElementRef;
  @ViewChild('scrollBottom') scrollBottom: ElementRef;

  messageList: HTMLElement;

  dataNotLoaded = true;
  dataLoaded: boolean;
  showAddList = false;
  user: UserInterface;
  addList: UserInterface[];
  addtempList: UserInterface[];
  roomTitle: string;

  chatIndex: number;

  constructor(
    private sanitizer: DomSanitizer,
    private activeRoute: ActivatedRoute,
    private i18n: I18nService,
    private title: Title,
    protected storage: NgForage,
    private socket: SocketService,
    public profile: OwnProfileService,
    public chatsService: ChatsService,
    private router: Router,
    private profileService: ProfileService,
    public friendsService: FriendsService
  ) {
    super();
    this.getChatData();
  }

  ngOnInit() {
    this.getUserdata();
    this.updateTitleOnLangChange();
    // this.updateTitleOnChatChange();
    this.setCustomScrollbar();
    this.showScrollBottomPanelOnScroll();
    this.scrollToBottomOnMessageSent();
    this.loadPrevMessagesOnScroll();
    this.setTitle();
  }

  getChatData(): void {
    this.activeRoute.params.subscribe((params) => {

      this.addtempList = [];

      this.showAddList = false;
      this.on('index', () => {
        this.getAddUserList();
      });


      if (this.chatsService.dataIsLoaded) {
        this.chatIndex = this.chatsService.getChatIndex(params.id);
          this.dataLoaded = true;
          this.dataNotLoaded = false;
          this.emit('index');
       } else {
        this.chatsService.on('DATA_IS_LOADED', () => {
          this.chatIndex = this.chatsService.getChatIndex(params.id);
          if (this.chatIndex === undefined) {
            this.chatsService.addRoom(params.id).then(() => {
              this.chatIndex = this.chatsService.getChatIndex(params.id);
              this.dataLoaded = true;
              this.dataNotLoaded = false;
              this.emit('index');
            });
          } else {
            this.dataLoaded = true;
            this.dataNotLoaded = false;
            this.emit('index');
          }
        });
      }
    });
  }

  getUserdata() {
    this.user = this.profile.user;
  }

  getAddUserList(): void {
    this.addList = this.friendsService.users.filter((item) => {
      return !this.chatsService.isUserInChat(this.chatIndex, item.id);
    });
  }

  setCustomScrollbar(): void {
    SimpleBar.removeObserver();
    const scrollbar = new SimpleBar(this.chat.nativeElement, scrollbarOpt);
    this.messageList = <HTMLElement> scrollbar.getScrollElement();
  }

  scrollToBottom(): void {
    const height = this.messageList.scrollHeight + this.messageList.clientHeight;
    this.messageList.scrollTop = height;
  }

  showScrollBottomPanelOnScroll(): void {
    this.messageList.addEventListener('scroll', () => {
      window.requestAnimationFrame((e =>  this.showSlideToBottom()));
    });
  }

  loadPrevMessagesOnScroll(): void {
    this.messageList.addEventListener('scroll', () => {
      window.requestAnimationFrame(() => {
        if (this.messageList.scrollTop === 0) {
          const h = this.messageList.scrollHeight;
          this.chatsService.loadPreviousMessages(this.chatIndex).then(() => {
            window.requestAnimationFrame(() => {
              this.messageList.scrollTop = this.messageList.scrollHeight - h;
            });
          });
        }
      });
    });
  }

  scrollToBottomOnMessageSent(): void {
    this.messageList.addEventListener('DOMNodeInserted', () => {
      const height = this.messageList.scrollTop + this.messageList.clientHeight;
      const scroll = <HTMLElement>this.scrollBottom.nativeElement;

      if (height > this.messageList.scrollHeight - this.messageList.clientHeight) {
        this.scrollToBottom();
      }
    });
  }

  showSlideToBottom(): void {

    const height = this.messageList.scrollTop + this.messageList.clientHeight;

    const scroll = <HTMLElement>this.scrollBottom.nativeElement;

    if (height < this.messageList.scrollHeight - this.messageList.clientHeight) {
      scroll.classList.add('scroll-bottom-show');
    } else {
      scroll.classList.remove('scroll-bottom-show');
    }

  }

  sendMessage(message: HTMLTextAreaElement): void {

    if (message.value.trim() !== '') {

      const date = Date.now();

      this.chatsService.addMessage(this.chatIndex, {
        sender_id: this.user.id,
        message: message.value,
        timestamp: date,
        sender_nickname: this.user.nickname,
        sender_avatar: this.user.avatar
      });

      message.value = null;
      this.playAudioOnMessageSent();
    }

  }

  sendMessageOnEnterPress(event: KeyboardEvent): void {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage(<HTMLTextAreaElement>event.target);
    }
  }

  playAudioOnMessageSent(): void {
    new Audio('./assets/sounds/send_message.ogg').play();
  }

  setTitle(): void {
    this.i18n.translate.get('hint.chats').subscribe((res: string) => {
      this.on('index', () => {
        this.title.setTitle(`${res} - ${this.chatsService.chats[this.chatIndex].title}`);
      });
    });
  }

  updateTitleOnLangChange(): void {
    this.i18n.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setTitle();
    });

  }

  showProfile(id: number): void {
    if (id === this.profile.user.id) {
      this.profile.emit('LOAD_USER');
      this.router.navigate(['app/profile']);
    } else {
      this.profileService.emit('LOAD_USER');
      this.router.navigate([`/app/search/user/${id}`]);
    }
  }

  // addUser(user: UserInterface): void {
  //   this.chatsService.addUserToRoom(this.chatIndex, user);
  //   this.showAddList = false;
  // }

  addUser(e: Event, user: UserInterface): void {
    let friend;
    if ((e.target as HTMLElement).classList.contains('friend')) {
      friend = e.target;
    } else {
      friend = this.findAncestor(e.target, 'friend') as HTMLElement;
    }

    if (friend.classList.contains('link-active')) {
      friend.classList.remove('link-active');
      const i = this.addtempList.indexOf(user);
      this.addtempList.splice(i, 1);
    } else {
      friend.classList.add('link-active');
      this.addtempList.push(user);
    }

  }

  private findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls)) {}
    return el;
  }

  closeList(): void {
    this.showAddList = false;
    this.addtempList = [];
    this.clearTitleInput();
  }

  showList(): void {
    this.showAddList = !this.showAddList;
    this.addtempList = [];
    this.clearTitleInput();
  }

  clearTitleInput(): void {
    this.roomTitle = '';
  }

  addUsersToChat(): void {
    for (let i = 0; i < this.addtempList.length; i++) {
      const user = this.addtempList[i];
      this.chatsService.addUserToRoom(this.chatIndex, user, this.roomTitle).then(() => {
        this.getAddUserList();
      });
    }
    this.showAddList = false;
    this.addtempList = [];
    this.clearTitleInput();
  }

  // updateTitleOnChatChange(): void {
  //   // this.chatService.on('title_changed', () => {
  //   //   this.setTitle();
  //   // });
  // }

}
