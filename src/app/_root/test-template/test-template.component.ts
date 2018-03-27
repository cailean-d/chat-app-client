import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-test-template',
  templateUrl: './test-template.component.html',
  styleUrls: ['./test-template.component.scss']
})
export class TestTemplateComponent implements OnInit, AfterViewChecked {

  @ViewChild('chat') chat: ElementRef;
  @ViewChild('scrollBottom') scrollBottom: ElementRef;

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
    image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_04.jpg',
    messages: this.messages.length
  };

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    // this.scrollToBottom();
  }

  scrollToBottom(): void {
    const height = this.chat.nativeElement.scrollHeight + this.chat.nativeElement.clientHeight;
    this.chat.nativeElement.scrollTop = height;
  }

  sendMessage(message: HTMLTextAreaElement) {
    if (message.value.trim() !== '') {
      this.messages.push({
        id: '1',
        name: 'Vincent',
        image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg',
        message: this.addBreaksToMessage(message.value),
        time: '10:12 AM, Today'
      });
      message.value = null;
    }
  }

  onTextMessage(event: KeyboardEvent) {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage(<HTMLTextAreaElement>event.target);
    }
  }

  addBreaksToMessage(text: string): string {
    return text.replace(/\r?\n/g, '<br />');
  }

  onScrollChat(event: WheelEvent) {

    const messages: HTMLElement = <HTMLElement> event.target;
    const height = messages.scrollTop + messages.clientHeight;

    const scroll = <HTMLElement>this.scrollBottom.nativeElement;

    if (height + messages.clientHeight < messages.scrollHeight) {
      scroll.classList.add('scroll-bottom-show');
    } else {
      scroll.classList.remove('scroll-bottom-show');
    }

  }
}
