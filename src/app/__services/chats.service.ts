import { Injectable } from '@angular/core';
import { ChatInterface } from '../__interfaces/chat';
import { EventEmitter } from 'eventemitter3';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Response } from '../__interfaces/response';

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

  constructor(private http: HttpClient) {
    super();
    this.chats = [];
    this.chatsFiltered = [];
    this.loadChats();
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
      this.assignLoadedChats(u);
      this.loadFilteredChats();
      this.emit('DATA_IS_LOADED');
      this.dataIsLoaded = true;
    } catch (res) {
      // console.error(res.error.status, res.error.message);
      throw new Error(res.error.message);
    }
  }

  private assignLoadedChats(chats: ChatInterface[] | ChatInterface): void {

    if (Array.isArray(chats)) {
      if (chats.length > 0) {
        for (const i of chats) {
          this.chats.push(i);
        }
      }
    } else {
      if (chats) {
        this.chats.push(chats);
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
      this.assignLoadedChats(chat);
      this.loadFilteredChats();
      return chatID;
    } catch (res) {
      // console.error(res.error.status, res.error.message);
      throw new Error(res);
    }
  }

}
