import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as SimpleBar from 'simplebar';


@Component({
  selector: 'app-test-template',
  templateUrl: './test-template.component.html',
  styleUrls: ['./test-template.component.scss']
})

export class TestTemplateComponent implements OnInit, AfterViewInit {

  @ViewChild('chat') chat: ElementRef;
  @ViewChild('scrollBottom') scrollBottom: ElementRef;
  @ViewChild('friendList') friendList: ElementRef;

  messageList: HTMLElement;

  scrollbarOpt = {
    classNames: {
      content: 'custom-content',
      scrollContent: 'custom-scroll-content',
      scrollbar: 'custom-scrollbar',
      track: 'custom-track'
    }
  };

  friends = [
    {
      img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg',
      name: 'Vincent Porter',
      online: 'online'
    },
    {
      img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg',
      name: 'Aiden Chavez',
      online: 'left 7 mins ago'
    },
    {
      img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_03.jpg',
      name: 'Mike Thomas',
      online: 'online'
    },
    {
      img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_04.jpg',
      name: 'Erica Hughes',
      online: 'online'
    },
    {
      img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg',
      name: 'Ginger Johnston',
      online: 'online'
    },
    {
      img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg',
      name: 'Tracy Carpenter',
      online: 'left 30 mins ago'
    },
    {
      img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_03.jpg',
      name: 'Christian Kelly',
      online: 'online'
    },
    {
      img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_04.jpg',
      name: 'Monica Ward',
      online: 'offline since Oct 28'
    },
    {
      img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg',
      name: 'Dean Henry',
      online: 'online'
    },
    {
      img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg',
      name: 'Peyton Mckinney',
      online: 'online'
    },
    {
      img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg',
      name: 'Peyton Mckinney',
      online: 'online'
    },
    {
      img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg',
      name: 'Peyton Mckinney',
      online: 'online'
    },
    {
      img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg',
      name: 'Peyton Mckinney',
      online: 'online'
    },
  ];

  filteredFriends = this.friends;

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
    id: '4',
    name: 'Ginger Johnston',
    image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_04.jpg'
  };

  favorite = [];

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {

    SimpleBar.removeObserver();

    const scrollbar = new SimpleBar(this.friendList.nativeElement, this.scrollbarOpt);
    const scrollbar2 = new SimpleBar(this.chat.nativeElement, this.scrollbarOpt);

    this.messageList = <HTMLElement> scrollbar2.getScrollElement();
    this.messageList.addEventListener('scroll', (e =>  this.slideToBottom(e as WheelEvent)));
    this.messageList.addEventListener('DOMNodeInserted', () => { this.scrollToBottom(); });

  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    const height = this.messageList.scrollHeight + this.messageList.clientHeight;
    this.messageList.scrollTop = height;
  }

  sendMessage(message: HTMLTextAreaElement): void {
    if (message.value.trim() !== '') {
      this.messages.push({
        id: '1',
        name: 'Vincent',
        image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg',
        message: this.addBreaksToMessage(message.value),
        time: '10:12 AM, Today'
      });
      message.value = null;
      this.playSound('./assets/sounds/send_message.ogg');
    }
  }

  onTextMessage(event: KeyboardEvent): void {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage(<HTMLTextAreaElement>event.target);
    }
  }

  addBreaksToMessage(text: string): string {
    return text.replace(/\r?\n/g, '<br />');
  }

  slideToBottom(event: WheelEvent): void {

    const messages: HTMLElement = <HTMLElement> event.target;
    const height = messages.scrollTop + messages.clientHeight;

    const scroll = <HTMLElement>this.scrollBottom.nativeElement;

    if (height < messages.scrollHeight - messages.clientHeight) {
      scroll.classList.add('scroll-bottom-show');
    } else {
      scroll.classList.remove('scroll-bottom-show');
    }

  }

  playSound(src: string, volume?: number): void {
    const sound: HTMLAudioElement = new Audio(src);
    sound.volume = volume || 0.5;
    sound.play();
  }

  filterFriends(event: Event): void {
    const search = <HTMLInputElement> event.target;
    this.filteredFriends = this.friends.filter((item) => {
      return item.name.match(new RegExp(search.value, 'i'));
    });
  }

  addToFavorite(q: any): void {
    this.favorite.push(q);
  }
}
