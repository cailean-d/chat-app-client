import { DomSanitizer, Title } from '@angular/platform-browser';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as SimpleBar from 'simplebar';
import { scrollbarOpt } from '../../__classes/customScrollOptions';
import { ActivatedRoute } from '@angular/router';
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
export class DialogComponent extends EventEmitter implements OnInit, AfterViewInit {

  @ViewChild('chat') chat: ElementRef;
  @ViewChild('scrollBottom') scrollBottom: ElementRef;

  messageList: HTMLElement;

  dataNotLoaded = true;
  dataLoaded: boolean;
  user: UserInterface;

  chatIndex: number;

  constructor(
    private sanitizer: DomSanitizer,
    private activeRoute: ActivatedRoute,
    private i18n: I18nService,
    private title: Title,
    protected storage: NgForage,
    private socket: SocketService,
    private profile: OwnProfileService,
    public chatsService: ChatsService
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
    this.setTitle();
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  getChatData(): void {
    this.activeRoute.params.subscribe((params) => {
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
    this.messageList.addEventListener('scroll', (e =>  this.showSlideToBottom()));
  }

  scrollToBottomOnMessageSent(): void {
    this.messageList.addEventListener('DOMNodeInserted', () => { this.scrollToBottom(); });
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

  // updateTitleOnChatChange(): void {
  //   // this.chatService.on('title_changed', () => {
  //   //   this.setTitle();
  //   // });
  // }

}
