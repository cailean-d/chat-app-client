import { ProfileService } from './profile.service';
import { chatArray } from '../__arrays/chats';
import { messagesArray } from '../__arrays/messages';
import { Injectable } from '@angular/core';
import { ChatInterface } from '../__interfaces/chat';
import { MessageInterface } from '../__interfaces/message';
import { DomSanitizer } from '@angular/platform-browser';
import { EventEmitter } from 'eventemitter3';
import { UserInterface } from '../__interfaces/user';

@Injectable()
export class ChatService extends EventEmitter {

  id: number;
  _title: string;
  image: string;
  users: Array<UserInterface>;
  messages: Array<MessageInterface>;

  get title(): string {
    return this._title;
  }

  set title(s: string) {
    this._title = s;
    this.emit('title_changed');
  }

  constructor(private profileService: ProfileService, private sanitizer: DomSanitizer) {
    super();
  }

  public getChatData(id: number): void {

    this.users = [];
    this.messages = [];

    const chat: ChatInterface = chatArray.find((el: any) => {
      return +el.id === +id;
    });

    this.getUsers(chat.members);
    this.getMessages(chat.id);

    if (!chat.title || !chat.image) {
      const firstUser: UserInterface = this.users.find((el: UserInterface) => {
        return el.id !== 99;
      });

      if (!chat.title) {
        this.title = firstUser.name;
      }

      if (!chat.image) {
        this.image = firstUser.image;
      }

    } else {
      this.title = chat.title;
      this.image = chat.image;
    }

  }

  public addMessage(msg: MessageInterface): void {
    let tempMessage = msg;
    tempMessage = this.addUserInfoToMessage(tempMessage);
    tempMessage.message = this.parseImage(tempMessage.message);
    tempMessage.message = this.parseLink(tempMessage.message);
    tempMessage.message = <string>this.sanitizer.bypassSecurityTrustHtml(tempMessage.message);
    this.messages.push(tempMessage);
  }

  private async getUsers(id: number[]): Promise<void> {
    for (const i of id) {
      const user = await this.profileService.getUser(i);
      this.users.push(user);
    }
  }

  private getMessages(id: number): void {

    const messages: Array<MessageInterface> = messagesArray.filter((el) => {
      return +el.chat_id === +id;
    });

    for (let msg of messages) {
      msg = this.addUserInfoToMessage(msg);
    }

    this.messages = messages;
  }

  private addUserInfoToMessage(msg: MessageInterface): MessageInterface {

    const user: UserInterface = this.users.find((el: UserInterface) => {
      return +el.id === +msg.sender_id;
    });

    msg.sender_image = user.image;
    msg.sender_name = user.name;

    return msg;
  }

  private addBreaksToMessage(text: string): string {
    return text.replace(/\r?\n/g, '<br />');
  }

  private parseImage(text: string): string {
    const imageRegExp = new RegExp(''
      + '^https?:\\/\\/[\\w.\\/\\-=%_?&$]*'
      + '(jpg|png|jpeg|gif)[\\w.\\/\\-=%_?&$]*$'
    );
    let res: any;
    if (res = text.match(imageRegExp)) {
      return text.replace(imageRegExp, `<img src="${res[0]}" alt="" style="max-width: 400px;
      width: 100%;" draggable="false">`);
    } else {
      return text;
    }
  }

  private parseLink(text: string): string {
    const linkRegExp = new RegExp(''
      + '(https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}'
      + '\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*))|((www\\.)?'
      + '[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.'
      + '(com|ru|info|biz|edu|gov|info|net|org)'
      + '\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*))',
    'g');
    return text.replace(linkRegExp, (str) => {
      const x: number = text.indexOf(str);
      if (text[x - 1] !== '"') {
        if (str.match(/^http/)) {

          return `<a href="${str}" target="_blank">${str}</a>`;
        } else {
          return `<a href="http://${str}" target="_blank">${str}</a>`;
        }
      } else {
        return str;
      }
    });
  }

}
