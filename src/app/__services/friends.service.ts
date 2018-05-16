import { EventEmitter } from 'eventemitter3';
import { friendsArray } from '../__arrays/friends';
import { UserInterface } from '../__interfaces/user';
import { Injectable } from '@angular/core';
import { User } from '../__classes/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Response } from '../__interfaces/response';

@Injectable()
export class FriendsService extends EventEmitter {

  private _search: string;

  public users: UserInterface[];
  public usersFiltered: UserInterface[];

  public dataIsLoaded: boolean;

  constructor(private http: HttpClient) {
    super();
    this.users = [];
    this.usersFiltered = [];
    this.loadUsers();
  }

  get search(): string {
    return this._search;
  }

  set search(s: string) {
    this._search = s;
    this.clearFilter();
    this.loadFilteredUsers();
  }

  private clearFilter(): void {
    this.usersFiltered = [];
  }

  public loadFilteredUsers(): void {
    this.usersFiltered = this.users.filter((item) => {
      return item.nickname.match(new RegExp(this.search, 'i'));
    });
  }

  public async loadUsers(): Promise<void> {
    try {
      const res: Response = await this.http.get<Response>('api/friends').toPromise();
      const u: Array<UserInterface> = res.data;
      this.assignLoadedUsers(u);
      this.loadFilteredUsers();
      this.emit('DATA_IS_LOADED');
      this.dataIsLoaded = true;
    } catch (res) {
      console.error(res.error.status, res.error.message);
    }
  }

  private assignLoadedUsers(users: UserInterface[] | UserInterface): void {

    if (Array.isArray(users)) {
      for (const i of users) {
        this.users.push(i);
      }
    } else {
      this.users.push(users);
    }

    this.users.sort(this.sort);
  }

  private sort(a: User | UserInterface, b: User | UserInterface): number {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  public async deleteFriend(index: number): Promise<void> {
    try {
      const r = `api/friends/${this.users[index].id}`;
      const response: any = await this.http.delete(r).toPromise();
      this.users.splice(index, 1).sort(this.sort);
      this.loadFilteredUsers();
      this.emit('USER_IS_DELETED');
    } catch (res) {
      // console.error(res.error.status, res.error.message);
      throw new Error(res.error.message);
    }
  }

  public async addFriend(index: number): Promise<void> {
    try {
      const r = `api/friends/${this.users[index].id}`;
      const response: any = await this.http.post(r, {}).toPromise();
      const user = response.data;
      this.assignLoadedUsers(user);
      this.loadFilteredUsers();
      this.emit('USER_IS_ADDED');
    } catch (res) {
      // console.error(res.error.status, res.error.message);
      throw new Error(res.error.message);
    }
  }

}
