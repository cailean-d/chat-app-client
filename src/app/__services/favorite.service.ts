import { EventEmitter } from 'eventemitter3';
import { Injectable } from '@angular/core';
import { UserInterface } from '../__interfaces/user';
import { Response } from '../__interfaces/response';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class FavoriteService extends EventEmitter {

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
      const res: Response = await this.http.get<Response>('api/favorite').toPromise();
      const u: Array<UserInterface> = res.data;
      this.assignLoadedUsers(u);
      this.loadFilteredUsers();
      this.emit('DATA_IS_LOADED');
      this.dataIsLoaded = true;
    } catch (res) {
      // console.error(res.error.status, res.error.message);
      throw new Error(res.error.message);
    }
  }

  private assignLoadedUsers(users: UserInterface[] | UserInterface): void {

    if (Array.isArray(users)) {
      if (users.length > 0) {
        for (const i of users) {
          this.users.push(i);
        }
      }
    } else {
      if (users) {
        this.users.push(users);
      }
    }

    this.users.sort(this.sort);
  }

  private sort(a: UserInterface, b: UserInterface): number {
    if (a.nickname < b.nickname) {
      return -1;
    }
    if (a.nickname > b.nickname) {
      return 1;
    }
    return 0;
  }

  public async deleteFavorite(index: number): Promise<void> {
    try {
      const r = `api/favorite/${this.users[index].id}`;
      const response: any = await this.http.delete(r).toPromise();
      this.users.splice(index, 1).sort(this.sort);
      this.loadFilteredUsers();
      this.emit('USER_IS_DELETED');
      this.emit('DATA_IS_CHANGED');
    } catch (res) {
      // console.error(res.error.status, res.error.message);
      throw new Error(res.error.message);
    }
  }

  public async addFavorite(index: number): Promise<void> {
    try {
      const r = `api/favorite/${index}`;
      const response: any = await this.http.post(r, {}).toPromise();
      const user = response.data;
      this.assignLoadedUsers(user);
      this.loadFilteredUsers();
      this.emit('USER_IS_ADDED');
      this.emit('DATA_IS_CHANGED');
    } catch (res) {
      // console.error(res.error.status, res.error.message);
      throw new Error(res.error.message);
    }
  }

}
