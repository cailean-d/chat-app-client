import { DomSanitizer } from '@angular/platform-browser';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as SimpleBar from 'simplebar';
import { scrollbarOpt } from '../../__classes/customScrollOptions';

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
  messages = [
    {
      id: '2',
      name: 'Ginger Johnston',
      image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_04.jpg',
      message: 'Hi Vincent, how are you? How is the project coming along?',
      time: '10:10 AM, Today'
    },
    {
      id: '1',
      name: 'Vincent',
      image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg',
      message: 'Are we meeting today? Project has been already finished and I have results to show you.',
      time: '10:12 AM, Today'
    },
    {
      id: '2',
      name: 'Ginger Johnston',
      image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_04.jpg',
      message: 'Hi Vincent, how are you? How is the project coming along?',
      time: '10:12 AM, Today'
    },
    {
      id: '1',
      name: 'Vincent',
      image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg',
      message: 'Are we meeting today? Project has been already finished and I have results to show you.',
      time: '10:12 AM, Today'
    },
    {
      id: '2',
      name: 'Ginger Johnston',
      image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_04.jpg',
      message: ' Hi Vincent, how are you? How is the project coming along?',
      time: '10:12 AM, Today'
    },
  ];


  currentChat = {
    image: 'https://www.lpzoo.org/sites/default/files/styles/slider/public/circle_redpanda.jpg',
    name: 'test'
  };

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.setCustomScrollbar();
    this.showScrollBottomPanelOnScroll();
    this.scrollToBottomOnMessageSent();
  }

  ngAfterViewInit() {
    this.scrollToBottom();
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
      let msgWithBreaks = this.addBreaksToMessage(message.value);
      msgWithBreaks = this.parseImage(msgWithBreaks);
      this.messages.push({
        id: '1',
        name: 'Vincent',
        image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg',
        message: <string>this.sanitizer.bypassSecurityTrustHtml(msgWithBreaks),
        time: '10:12 AM, Today'
      });
      message.value = null;
      new Audio('./assets/sounds/send_message.ogg').play();
    }
  }

  sendMessageOnEnterPress(event: KeyboardEvent): void {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage(<HTMLTextAreaElement>event.target);
    }
  }

  addBreaksToMessage(text: string): string {
    return text.replace(/\r?\n/g, '<br />');
  }

  parseImage(text: string): string {
    const imageRegExp = /^https?:\/\/[\w.\/\-=%_?&$]*(jpg|png|jpeg|gif)[\w.\/\-=%_?&$]*/;
    let res: any;
    if (res = text.match(imageRegExp)) {
      return text.replace(imageRegExp, `<img src="${res[0]}" alt="" style="max-width: 400px;
      width: 100%;" draggable="false">`);
    } else {
      return text;
    }
  }

}
