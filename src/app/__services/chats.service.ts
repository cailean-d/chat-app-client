import { SocketService, SocketAction, SocketEvent } from './socket.service';
import { OwnProfileService } from './own-profile.service';
import { Injectable } from '@angular/core';
import { ChatInterface } from '../__interfaces/chat';
import { EventEmitter } from 'eventemitter3';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Response } from '../__interfaces/response';
import { UserInterface } from '../__interfaces/user';
import { MessageInterface } from '../__interfaces/message';

@Injectable()
export class ChatsService extends EventEmitter {

  private _search: string;

  public chats: ChatInterface[];
  public chatsFiltered: ChatInterface[];

  public dataIsLoaded: boolean;

  get search(): string {
    return this._search;
  }

  set search(s: string) {
    this._search = s;
    this.clearFilter();
    this.loadFilteredChats();
  }

  constructor(
    private http: HttpClient,
    private profile: OwnProfileService,
    private socket: SocketService
  ) {
    super();
    this.chats = [];
    this.chatsFiltered = [];
    this.loadChats();
    this.listenSocketEvents();
  }

  public getChatIndex(id: number): number {
    for (let i = 0; i < this.chats.length; i++) {
      if (+this.chats[i].id === +id) {
        return i;
      }
    }
  }

  public loadFilteredChats(): void {
    this.chatsFiltered = this.chats.filter((item) => {
      return item.title.match(new RegExp(this.search, 'i'));
    });
  }

  public async loadChats(): Promise<void> {
    try {
      const res: Response = await this.http.get<Response>('api/rooms').toPromise();
      const u: Array<ChatInterface> = res.data;
      await this.assignLoadedChats(u);
      this.loadFilteredChats();
      this.dataIsLoaded = true;
      this.emit('DATA_IS_LOADED');
    } catch (res) {
      // console.error(res.error.status, res.error.message);
      throw new Error(res);
    }
  }

  private async assignLoadedChats(chats: ChatInterface[] | ChatInterface): Promise<void> {

    if (Array.isArray(chats)) {
      if (chats.length > 0) {
        for (const i of chats) {
          this.chats.push(await this.addDataToRoom(i));
          this.socket.emit(SocketAction.ENTER_ROOM, i.id);
        }
      }
    } else {
      if (chats) {
        this.chats.push(await this.addDataToRoom(chats));
        this.socket.emit(SocketAction.ENTER_ROOM, chats.id);
      }
    }

    this.chats.sort(this.sortChats);

  }

  private clearFilter(): void {
    this.chatsFiltered = [];
  }

  private sortChats(a: ChatInterface, b: ChatInterface): number {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  }

  public updateChatMessage(id: number, message: string): void {
    for (const i in this.chats) {
      if (+this.chats[i].id === +id) {
        this.chats[i].message = message;
        break;
      }
    }
    this.loadFilteredChats();
  }

  public async getUserRoom(id: number): Promise<number> {
    try {
      const response: any = await this.http.post(`api/rooms/open/${id}`, {}).toPromise();
      const chatID: number = response.data;
      const res: Response = await this.http.get<Response>(`api/rooms/${chatID}`).toPromise();
      const chat: ChatInterface = res.data;
      if (this.getChatIndex(chat.id) === undefined) {
        await this.assignLoadedChats(chat);
        this.loadFilteredChats();
      }
      return chatID;
    } catch (res) {
      // console.error(res.error.status, res.error.message);
      throw new Error(res);
    }
  }

  private async getUsers(id: number): Promise<UserInterface[]> {
    try {
      const res: Response = await this.http.get<Response>(`api/rooms/${id}/users`).toPromise();
      return res.data as UserInterface[];
    } catch (res) {
      // console.error(res.error.status, res.error.message);
      throw new Error(res.error.message);
    }
  }

  private async getMessages(id: number): Promise<MessageInterface[]> {
    try {
      const res: Response = await this.http.get<Response>(`api/messages/${id}`).toPromise();
      return res.data as MessageInterface[];

    } catch (res) {
      // console.error(res.error.status, res.error.message);
      throw new Error(res);
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

  private async addDataToRoom(chat: ChatInterface): Promise<ChatInterface> {
    chat.users = await this.getUsers(chat.id);
    const msg = await this.getMessages(chat.id);
    if (msg) {
      chat.messages = msg.reverse();
    } else {
      chat.messages = [];
    }

    return chat;
  }

  private async sendMessage(id: number, msg: string): Promise<void> {
    try {
      const res: Response = await this.http.post<Response>(`api/messages/${id}`, {
        message: msg
      }).toPromise();

      this.socket.emit(SocketAction.CHAT_MESSAGE, {
        chat_id: id,
        message: msg,
        sender_id: this.profile.user.id,
        sender_nickname: this.profile.user.nickname,
        sender_avatar: this.profile.user.avatar,
        timestamp: Date.now()
      });

      const _id = this.getChatIndex(id);

      if (this.chats[_id].messages.length === 0) {
        this.socket.emit(SocketAction.ROOM_INVITE, {
          chat_id: id,
          user_id: this.getSecondUserOfRoom(id)
        });
      }

    } catch (res) {
      // console.error(res.error.status, res.error.message);
      throw new Error(res);
    }
  }

  public async addMessage(id: number, msg: MessageInterface): Promise<void> {
    const _id = this.chats[id].id;
    await this.sendMessage(_id, msg.message);
    this.chats[id].messages.push(msg);
    this.updateChatMessage(_id, msg.message);
  }

  public async addRoom(id: number): Promise<void> {
    if (this.getChatIndex(id) === undefined) {
      const room = await this.getRoom(id);
      await this.assignLoadedChats(room);
      this.loadFilteredChats();
    }
  }

  private listenSocketEvents(): void {
    this.socket.onEvent(SocketEvent.CHAT_MESSAGE).subscribe((data) => {
      const msg = JSON.parse(data) as MessageInterface;
      for (const i in this.chats) {
        if (+this.chats[i].id === +msg.chat_id) {
          this.chats[i].messages.push(msg);
          break;
        }
      }
      this.updateChatMessage(msg.chat_id, msg.message);
    });

    this.socket.onEvent(SocketEvent.ROOM_INVITE).subscribe((data) => {
      this.addRoom(data);
    });
  }

  private getSecondUserOfRoom(id: number): number {
    for (let i = 0; i < this.chats.length; i++) {
      if (+this.chats[i].id === +id) {
        for (let j = 0; j < this.chats[i].users.length; j++) {
          const el: UserInterface = this.chats[i].users[j];
          if (+el.id !== +this.profile.user.id) {
            return el.id;
          }
        }
      }
    }
  }


}
