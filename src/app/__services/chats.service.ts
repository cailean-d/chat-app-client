import { Injectable } from '@angular/core';
import { chatArray } from '../__arrays/chats';
import { ChatInterface } from '../__interfaces/chat';

@Injectable()
export class ChatsService {

  private _search: string;

  public chats: ChatInterface[];
  public chatsFiltered: ChatInterface[];

  get search(): string {
    return this._search;
  }

  set search(s: string) {
    this._search = s;
    this.clearFilter();
    this.loadFilteredChats();
  }

  constructor() {
    this.chats = [];
    this.chatsFiltered = [];
    this.loadChats();
  }

  public loadFilteredChats(): void {
    this.chatsFiltered = this.chats.filter((item) => {
      return item.title.match(new RegExp(this.search, 'i'));
    });
  }

  public loadChats(): void {
    const result: Array<ChatInterface> = chatArray.sort(this.sortChats);
    this.assignLoadedUsers(result);
  }

  private assignLoadedUsers(chats: ChatInterface[]): void {
    for (const i of chats) {
      this.chats.push(i);
    }
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

}
