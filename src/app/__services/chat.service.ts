import { ChatsService } from './chats.service';
import { Injectable } from '@angular/core';
import { ChatInterface } from '../__interfaces/chat';
import { MessageInterface } from '../__interfaces/message';
import { EventEmitter } from 'eventemitter3';
import { UserInterface } from '../__interfaces/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Response } from '../__interfaces/response';
import { SocketService, SocketAction, SocketEvent } from './socket.service';

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

  constructor(
    private http: HttpClient,
    private chatsService: ChatsService,
    private socket: SocketService
  ) {
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

    this.socket.emit(SocketAction.ENTER_ROOM, this.id);

    this.socket.onEvent(SocketEvent.CHAT_MESSAGE).subscribe((data) => {
      const msg = JSON.parse(data);
      this.messages.push(msg);
      this.chatsService.updateChatMessage(this.id, msg.message);
    });

  }

  public addMessage(msg: MessageInterface): void {
    this.sendMessage(msg.message);
    this.messages.push(msg);
    this.chatsService.updateChatMessage(this.id, msg.message);
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

}
