import { FriendsService } from '../../__services/friends.service';
import { ProfileService } from '../../__services/profile.service';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
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
import { MessageInterface } from '../../__interfaces/message';
import * as MediaRecorderAPI from 'js-media-recorder';
import { ISubscription } from 'rxjs/Subscription';
import { PeerService, PeerEvent } from '../../__services/peer.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent extends EventEmitter implements OnInit, OnDestroy {

  @ViewChild('chat') chat: ElementRef;
  @ViewChild('scrollBottom') scrollBottom: ElementRef;
  @ViewChild('audio') audio: ElementRef;
  @ViewChild('videoRecord') videoRecord: ElementRef;
  @ViewChild('videoView') videoView: ElementRef;

  routeSubscription: ISubscription;
  i18nSubscription: ISubscription;
  i18nChangeSubscription: ISubscription;
  _listeners = [];

  messageList: HTMLElement;


  dataNotLoaded = true;
  dataLoaded: boolean;
  showAddList = false;
  showUserList = false;
  _showAttachMenu = false;

  user: UserInterface;
  addList: UserInterface[];
  addtempList: UserInterface[];
  roomTitle: string;
  isTyping = false;

  chatIndex: number;

  _showAudioRecord = false;
  audioIsRecording = false;
  audioIsRecorded = false;

  _showVideoRecord = false;
  videoIsRecording = false;
  videoIsRecorded = false;

  __recorder = null;
  __file: Blob;
  __file_ext: string;

  constructor(
    public sanitizer: DomSanitizer,
    private activeRoute: ActivatedRoute,
    private i18n: I18nService,
    private title: Title,
    protected storage: NgForage,
    private socket: SocketService,
    public profile: OwnProfileService,
    public chatsService: ChatsService,
    private router: Router,
    private profileService: ProfileService,
    public friendsService: FriendsService,
    private peer: PeerService
  ) {
    super();
  }

  ngOnInit() {
    this.on('index', () => {
      this.dataLoaded = true;
      this.dataNotLoaded = false;
      this.getAddUserList();
      window.requestAnimationFrame(() => {
        this.scrollToBottom();
      });
    });

    this.scrollToBottomOnMessageSent();
    this.updateTitleOnLangChange();
    // this.updateTitleOnChatChange();
    // this.setCustomScrollbar();
    // this.showScrollBottomPanelOnScroll();
    // this.loadPrevMessagesOnScroll();

    this.getChatData();
    this.setTitle();
  }

  ngOnDestroy() {
    this.removeAllListeners();
    this.routeSubscription.unsubscribe();
    this.i18nSubscription.unsubscribe();
    this.i18nChangeSubscription.unsubscribe();
    this.chatsService.removeListener('DATA_IS_LOADED', this._listeners[0]);
  }

  getChatData(): void {
    this.routeSubscription = this.activeRoute.params.subscribe((params) => {

      this.addtempList = [];

      this.dataLoaded = false;
      this.dataNotLoaded = true;
      this.showAddList = false;
      this.showUserList = false;

      if (this.chatsService.dataIsLoaded) {
        this.chatIndex = this.chatsService.getChatIndex(params.id);
        this.emit('index');
      } else {
        this.chatsService.on('DATA_IS_LOADED', this._listeners[0] = () => {
          this.chatIndex = this.chatsService.getChatIndex(params.id);
          if (this.chatIndex === undefined) {
            this.chatsService.addRoom(params.id).then(() => {
              this.chatIndex = this.chatsService.getChatIndex(params.id);
              this.emit('index');
            });
          } else {
            this.emit('index');
          }
        });
      }
    });
  }

  getAddUserList(): void {
    this.addList = this.friendsService.users.filter((item) => {
      return !this.chatsService.isUserInChat(this.chatIndex, item.id);
    });
  }

  // setCustomScrollbar(): void {
    // SimpleBar.removeObserver();
    // const scrollbar = new SimpleBar(this.chat.nativeElement, scrollbarOpt);
    // this.messageList = <HTMLElement> scrollbar.getScrollElement();
  // }

  scrollToBottom(): void {
    const height = this.chat.nativeElement.scrollHeight + this.chat.nativeElement.clientHeight;
    this.chat.nativeElement.scrollTop = height;
  }

  loadPrevMessagesOnScroll(event: Event): void {
    const el = event.target as HTMLElement;
    window.requestAnimationFrame(() => {
      if (el.scrollTop === 0) {
        const h = el.scrollHeight;
        this.chatsService.loadPreviousMessages(this.chatIndex).then(() => {
          window.requestAnimationFrame(() => {
            el.scrollTop = el.scrollHeight - h;
          });
        });
      }
    });
  }

  scrollToBottomOnMessageSent(): void {
    this.chatsService.on('message_added', () => {
      const height = this.chat.nativeElement.scrollTop + this.chat.nativeElement.clientHeight;
      if (height > this.chat.nativeElement.scrollHeight - this.chat.nativeElement.clientHeight) {
        window.requestAnimationFrame(() => {
          this.scrollToBottom();
        });
      }
    });
  }

  messageClickEvents(event: Event): void {
    const el = event.target as HTMLElement;

    if (el.getAttribute('data-profile')) {
      this.showProfile(+el.getAttribute('data-profile'));
    }
  }

  messageMouseOverEvents(event: Event): void {
    const el = event.target as HTMLElement;

    if (el.getAttribute('data-message-id')) {
      const mIndex = +el.getAttribute('data-message-index');
      const mId = +el.getAttribute('data-message-id');
      const sender = +el.getAttribute('data-message-sender');
      const status = +el.getAttribute('data-message-status');
      this.readMessage(mId, sender, status, mIndex, el);
    }
  }

  showSlideToBottom(event: Event): void {

    const el = event.target as HTMLElement;
    const height = el.scrollTop + el.clientHeight;
    const scroll = <HTMLElement>this.scrollBottom.nativeElement;

    if (height < el.scrollHeight - el.clientHeight) {
      scroll.classList.add('scroll-bottom-show');
    } else {
      scroll.classList.remove('scroll-bottom-show');
    }

  }

  sendMessage(message: HTMLTextAreaElement): void {

    if (this.audioIsRecorded) {
      this.chatsService.sendFile(this.__file, this.__file_ext).then(path => {
        this.closeAudioRecord();

        const date = Date.now();

        this.chatsService.addMessage(this.chatIndex, {
          sender_id: this.profile.user.id,
          message: '[audio_message] ' + path,
          timestamp: date,
          sender_nickname: this.profile.user.nickname,
          sender_avatar: this.profile.user.avatar,
          status: 0
        });

        this.playAudioOnMessageSent();
      });
    } else {
      if (message.value.trim() !== '') {

        const date = Date.now();

        this.chatsService.addMessage(this.chatIndex, {
          sender_id: this.profile.user.id,
          message: message.value,
          timestamp: date,
          sender_nickname: this.profile.user.nickname,
          sender_avatar: this.profile.user.avatar,
          status: 0
        });

        message.value = null;
        this.playAudioOnMessageSent();
      }
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
    this.i18nSubscription = this.i18n.translate.get('hint.chats').subscribe((res: string) => {
      this.on('index', () => {
        this.title.setTitle(`${res} - ${this.chatsService.chats[this.chatIndex].title}`);
      });
    });
  }

  updateTitleOnLangChange(): void {
    this.i18nChangeSubscription = this.i18n.translate.onLangChange.subscribe((event: LangChangeEvent) => {
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

  closeUserList(): void {
    this.showUserList = false;
  }

  closeAttachMenu(): void {
    this._showAttachMenu = false;
  }

  closeAudioRecord(): void {
    this._showAudioRecord = false;
    this.audioIsRecorded = false;
    this.audioIsRecording = false;
    this.__file = null;
    this.__file_ext = null;
    this.__recorder = null;
  }

  closeVideoRecord(): void {
    this._showVideoRecord = false;
    this.videoIsRecorded = false;
    this.videoIsRecording = false;
    this.__file = null;
    this.__file_ext = null;
    this.__recorder = null;
  }

  showList(): void {
    this.showUserList = false;
    this.showAddList = !this.showAddList;
    this.addtempList = [];
    this.clearTitleInput();
  }

  showUsersList(): void {
    this.showAddList = false;
    this.showUserList = !this.showUserList;
  }

  showVideoCallPanel(): void {
    const id = this.chatsService.getSecondUserOfRoom(this.chatsService.chats[this.chatIndex].id);
    this.peer.emit('call', id);
  }

  showAttachMenu(): void {
    this._showAttachMenu = !this._showAttachMenu;
  }

  showAudioRecord(): void {
    this._showAudioRecord = true;
    this._showAttachMenu = false;
  }

  showVideoRecord(): void {
    this._showVideoRecord = true;
    this._showAttachMenu = false;
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

  readMessage(msgId: number, sender: number, status: number, mIndex: number, msg_el: HTMLElement): void {
    if (sender !== this.profile.user.id && status === 0) {
      this.chatsService.readMessage(this.chatIndex, msgId, mIndex).then(() => {
        msg_el.setAttribute('data-message-status', '1');
      });
    }
  }

  typing(): void {
    if (!this.isTyping) {
      this.chatsService.emitTyping(this.chatIndex);
      this.isTyping = true;

      setTimeout(() => {
        this.isTyping = false;
      }, 1300);

    }

  }

  recordAudioMessage(): void {
    this.audioIsRecording = true;
    this.audioIsRecorded = false;
    this.__recorder = new MediaRecorderAPI(false, true);
    this.__recorder.start();
  }

  stopRecordingAudio(): void {
    this.audioIsRecording = false;
    this.audioIsRecorded = true;
    this.__recorder.stop().then(file => {
      this.__file = file.blob;
      this.__file_ext = file.extension;
      const mediaUrl = window.URL.createObjectURL(file.blob);
      (this.audio.nativeElement as HTMLAudioElement).src = mediaUrl;
      this.__recorder = null;
    });
  }

  recordVideoMessage(): void {
    this.videoIsRecording = true;
    this.videoIsRecorded = false;
    this.__recorder = new MediaRecorderAPI(true, true);
    this.__recorder.start().then(() => {
      (this.videoRecord.nativeElement as HTMLVideoElement).srcObject = this.__recorder.stream;
    });
  }

  stopRecordingVideo(): void {
    this.videoIsRecording = false;
    this.videoIsRecorded = true;
    this.__recorder.stop().then(file => {
      this.__file = file.blob;
      this.__file_ext = file.extension;
      const mediaUrl = window.URL.createObjectURL(file.blob);
      (this.videoView.nativeElement as HTMLVideoElement).src = mediaUrl;
      this.__recorder = null;
    });
  }

  sendVideoMessage(): void {
    this.chatsService.sendFile(this.__file, this.__file_ext).then(path => {
      this.closeVideoRecord();

      const date = Date.now();

      this.chatsService.addMessage(this.chatIndex, {
        sender_id: this.profile.user.id,
        message: '[video_message] ' + path,
        timestamp: date,
        sender_nickname: this.profile.user.nickname,
        sender_avatar: this.profile.user.avatar,
        status: 0
      });

      this.playAudioOnMessageSent();
    });
  }

}
