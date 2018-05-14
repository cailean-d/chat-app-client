import { DomSanitizer, Title } from '@angular/platform-browser';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as SimpleBar from 'simplebar';
import { scrollbarOpt } from '../../__classes/customScrollOptions';
import { ChatService } from '../../__services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { LangChangeEvent } from '@ngx-translate/core';
import { I18nService } from '../../__services/i18n.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, AfterViewInit {

  @ViewChild('chat') chat: ElementRef;
  @ViewChild('scrollBottom') scrollBottom: ElementRef;
  @ViewChild('friendList') friendList: ElementRef;

  messageList: HTMLElement;

  constructor(
    private sanitizer: DomSanitizer,
    public chatService: ChatService,
    private activeRoute: ActivatedRoute,
    private i18n: I18nService,
    private title: Title
  ) {
  }

  ngOnInit() {
    this.setCustomScrollbar();
    this.showScrollBottomPanelOnScroll();
    this.scrollToBottomOnMessageSent();
    this.getChatData();
    this.setTitle();
    this.updateTitleOnLangChange();
    this.updateTitleOnChatChange();
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  getChatData(): void {
    this.activeRoute.params.subscribe((params) => {
      this.chatService.getChatData(params.id);
    });
  }

  setCustomScrollbar(): void {
    SimpleBar.removeObserver();
    const scrollbar = new SimpleBar(this.chat.nativeElement, scrollbarOpt);
    this.messageList = <HTMLElement> scrollbar.getScrollElement();
  }

  scrollToBottom(): void {
    setTimeout(() => {
      const height = this.messageList.scrollHeight + this.messageList.clientHeight;
      this.messageList.scrollTop = height;
    }, 0);
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

      this.chatService.addMessage({
        sender_id: 99,
        message: message.value,
        timestamp: Date.now()
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
      this.title.setTitle(`${res} - ${this.chatService.title}`);
    });

  }

  updateTitleOnLangChange(): void {
    this.i18n.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setTitle();
    });

  }

  updateTitleOnChatChange(): void {
    this.chatService.on('title_changed', () => {
      this.setTitle();
    });
  }

}
