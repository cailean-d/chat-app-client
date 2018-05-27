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

  private messageLoadLimit = 20;
  private loadedMessages = {};
  private messagesIsLoading: boolean;

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

  public isUserInChat(id: number, user: number): boolean {
    for (let i = 0; i < this.chats[id].users.length; i++) {
      if (+this.chats[id].users[i].id === +user) {
        return true;
      }
    }
    return false;
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

  private async sendMessage(id: number, msg: string): Promise<number> {
    try {
      const res: Response = await this.http.post<Response>(`api/messages/${id}`, {
        message: msg
      }).toPromise();

      this.socket.emit(SocketAction.CHAT_MESSAGE, {
        id: res.data,
        chat_id: id,
        message: msg,
        sender_id: this.profile.user.id,
        sender_nickname: this.profile.user.nickname,
        sender_avatar: this.profile.user.avatar,
        timestamp: Date.now(),
        status: 0
      });

      const _id = this.getChatIndex(id);

      if (this.chats[_id].messages.length === 0) {
        for (let i = 0; i < this.chats[_id].users.length; i++) {
          const user = this.chats[_id].users[i];
          if (+user.id !== +this.profile.user.id) {
            this.socket.emit(SocketAction.ROOM_INVITE, {
              chat_id: id,
              user_id: user.id
            });
          }
        }
      }

      return res.data;

    } catch (res) {
      // console.error(res.error.status, res.error.message);
      throw new Error(res);
    }
  }

  public async addMessage(id: number, msg: MessageInterface): Promise<void> {
    const _id = this.chats[id].id;
    const msg_id = await this.sendMessage(_id, msg.message);
    msg.id = msg_id;
    this.chats[id].messages.push(msg);
    this.loadedMessages[_id]++;
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
          const _id = this.chats[i].id;
          this.loadedMessages[_id]++;
          break;
        }
      }
      this.updateChatMessage(msg.chat_id, msg.message);
    });

    this.socket.onEvent(SocketEvent.ROOM_INVITE).subscribe((data) => {
      this.addRoom(data);
    });

    this.socket.onEvent(SocketEvent.READ_MESSAGE).subscribe((data) => {
      const _data = JSON.parse(data);
      this.readMsgInChat(_data.chat_id, _data.msg_id);
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

  public async loadPreviousMessages(id: number): Promise<void> {

    const _id = this.chats[id].id;
    let offset;

    if (!this.messagesIsLoading) {
      this.messagesIsLoading = true;

      if (this.loadedMessages[_id]) {
        offset = this.loadedMessages[_id] + 20;
      } else {
        offset = 20;
      }

      const Params = new HttpParams({
        fromObject: {
          offset: offset,
          limit: this.messageLoadLimit.toString()
        }
      });

      try {
        const res: Response = await this.http.get<Response>(`api/messages/${_id}`,
        {params: Params}).toPromise();

        const messages: Array<MessageInterface> = res.data;

        if (messages) {

          for (const message of messages) {
            this.chats[id].messages.unshift(message);
          }

          if (this.loadedMessages[_id]) {
            this.loadedMessages[_id] += messages.length;
          } else {
            this.loadedMessages[_id] = messages.length;
          }

        }

        this.messagesIsLoading = false;
      } catch (error) {
        console.error(error);
        this.messagesIsLoading = false;
      }
    }
  }

  public async addUserToRoom(id: number, user: UserInterface, title?: string): Promise<void> {
    try {
      const _id = this.chats[id].id;
      const res: Response = await this.http.post<Response>(`api/rooms/${_id}/${user.id}`,
      {title: title}).toPromise();

      this.chats[id].users.push(user);
      this.loadFilteredChats();

      this.socket.emit(SocketAction.ROOM_INVITE, {
        chat_id: _id,
        user_id: user.id
      });

      if (title) {
        const chat = await this.getRoom(_id);

        this.chats[id].title = chat.title;
        this.chats[id].picture = chat.picture;
      }

    } catch (res) {
      console.error(res);
      throw new Error(res);
    }
  }

  public chatIsExists(arr: number[]): false | number {

    for (let i = 0; i < this.chats.length; i++) {
      const chat = this.chats[i];
      if (this.hasSameUsers(chat, arr)) {
        return chat.id;
      }
    }
    return false;
  }

  private hasSameUsers(chat: ChatInterface, arr: number[]): boolean {

    for (let i = 0; i < chat.users.length; i++) {
      const user = chat.users[i];
      if (+arr.indexOf(user.id) === -1) {
        return false;
      }
    }

    if (chat.users.length === arr.length) {
      return true;
    } else {
      return false;
    }
  }

  public async createRoom(users: number[], title?: string): Promise<number> {
    try {
      const response: any = await this.http.post(`api/rooms`, {
        title: title,
        users: JSON.stringify(users)
      }).toPromise();
      const chatID: number = response.data;
      const res: Response = await this.http.get<Response>(`api/rooms/${chatID}`).toPromise();
      const chat: ChatInterface = res.data;
      await this.assignLoadedChats(chat);
      this.loadFilteredChats();
      return chatID;
    } catch (res) {
      // console.error(res.error.status, res.error.message);
      throw new Error(res);
    }
  }

  public async readMessage(room_index: number, msg_id: number): Promise<void> {
    try {

      const _id = this.chats[room_index].id;

      await this.http.patch<Response>(`api/messages/${_id}/${msg_id}`, {}).toPromise();

      this.socket.emit(SocketAction.READ_MESSAGE, {
        chat_id: _id,
        msg_id: msg_id
      });

    } catch (res) {
      // console.error(res.error.status, res.error.message);
      throw new Error(res);
    }
  }

  private readMsgInChat(room: number, msg: number): void {
    const index = this.getChatIndex(room);

    for (let i = 0; i < this.chats[index].messages.length; i++) {
      const _msg: MessageInterface = this.chats[index].messages[i];
      if (+_msg.id === +msg) {
        _msg.status = 1;
      }
    }
  }



}
