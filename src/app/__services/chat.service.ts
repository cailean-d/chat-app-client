import { Injectable } from '@angular/core';
import { ChatInterface } from '../__interfaces/chat';
import { MessageInterface } from '../__interfaces/message';
import { DomSanitizer } from '@angular/platform-browser';
import { EventEmitter } from 'eventemitter3';
import { UserInterface } from '../__interfaces/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Response } from '../__interfaces/response';

@Injectable()
export class ChatService extends EventEmitter {

  id: number;
  _title: string;
  image: string;
  users: UserInterface[];
  messages: MessageInterface[];

  get title(): string {
    return this._title;
  }

  set title(s: string) {
    this._title = s;
    this.emit('title_changed');
  }

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
    super();
  }

  public async getChatData(id: number): Promise<void> {

    this.users = [];
    this.messages = [];

    this.getUsers(id);
    this.getMessages(id);

    const room = await this.getRoom(id);

    this.id = id;
    this.title = room.title;
    this.image = room.picture;

  }

  public addMessage(msg: MessageInterface): void {
    this.sendMessage(msg.message);
    let tempMessage = msg;
    tempMessage = this.addUserInfoToMessage(tempMessage);
    tempMessage.message = this.parseImage(tempMessage.message);
    tempMessage.message = this.parseLink(tempMessage.message);
    tempMessage.message = <string>this.sanitizer.bypassSecurityTrustHtml(tempMessage.message);
    this.messages.push(tempMessage);
  }

  private async getUsers(id: number): Promise<void> {
    try {
      const res: Response = await this.http.get<Response>(`api/rooms/${id}/users`).toPromise();
      this.users = res.data as UserInterface[];
    } catch (res) {
      // console.error(res.error.status, res.error.message);
      throw new Error(res.error.message);
    }
  }

  private async getMessages(id: number): Promise<void> {
    try {
      const res: Response = await this.http.get<Response>(`api/messages/${id}`).toPromise();
      const msgs = res.data as MessageInterface[];

      for (let i = msgs.length - 1; i >= 0; i--) {
        this.messages.push(msgs[i]);
      }

    } catch (res) {
      // console.error(res.error.status, res.error.message);
      throw new Error(res.error.message);
    }
  }

  private async getRoom(id: number): Promise<ChatInterface> {
    try {
      const res: Response = await this.http.get<Response>(`api/rooms/${id}`).toPromise();
      return res.data as ChatInterface;
    } catch (res) {
      // console.error(res.error.status, res.error.message);
      throw new Error(res.error.message);
    }
  }

  private async sendMessage(msg: string): Promise<void> {
    try {
      const res: Response = await this.http.post<Response>(`api/messages/${this.id}`, {
        message: msg
      }).toPromise();

    } catch (res) {
      // console.error(res.error.status, res.error.message);
      throw new Error(res.error.message);
    }
  }

  private addUserInfoToMessage(msg: MessageInterface): MessageInterface {

    // const user: UserInterface = this.users.find((el: UserInterface) => {
    //   return +el.id === +msg.sender_id;
    // });

    // msg.sender_image = user.image;
    // msg.sender_name = user.name;

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
