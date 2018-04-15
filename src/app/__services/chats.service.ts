import { ProfileService } from './profile.service';
import { Injectable } from '@angular/core';
import { chatArray } from '../__arrays/chats';
import { ChatInterface } from '../__interfaces/chat';
import { User } from '../__classes/user';

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

  constructor(private user: ProfileService) {
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
      this.chats.push(this.getChatInfo(i));
    }
  }

  private getChatInfo(chat: ChatInterface) {

      if (!chat.title || !chat.image) {

        const members: number[] = chat.members;

        const firstUser: number = members.find((el: any) => {
            if (el !== 99) {
              return el;
            }
        });

        const user: User = this.user.getUser(firstUser);

        if (!chat.title) {
          chat.title = user.name;
        }

        if (!chat.image) {
          chat.image = user.image;
        }

      }

      return chat;

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
