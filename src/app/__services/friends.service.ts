import { OwnProfileService } from './own-profile.service';
import { SocketService, SocketAction, SocketEvent } from './socket.service';
import { EventEmitter } from 'eventemitter3';
import { UserInterface } from '../__interfaces/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Response } from '../__interfaces/response';

@Injectable()
export class FriendsService extends EventEmitter {

  private _search: string;

  public users: UserInterface[];
  public usersFiltered: UserInterface[];

  public dataIsLoaded: boolean;

  constructor(
    private http: HttpClient,
    private socket: SocketService,
    private profile: OwnProfileService
  ) {
    super();
    this.users = [];
    this.usersFiltered = [];
    this.loadUsers();
    this.listenSocketEvents();
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
      // console.error(res.error.status, res.error.message);
      throw new Error(res.error.message);
    }
  }

  private assignLoadedUsers(users: UserInterface[] | UserInterface): void {

    if (Array.isArray(users)) {
      if (users.length > 0) {
        for (const i of users) {
          this.users.push(i);
          this.socket.emit(SocketAction.GET_ONLINE, i.id);
        }
      }
    } else {
      if (users) {
        this.users.push(users);
        this.socket.emit(SocketAction.GET_ONLINE, users.id);
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

  public async deleteFriend(index: number): Promise<void> {
    try {

      let id;

      if (this.users[index]) {
        id = this.users[index].id;
        this.users.splice(index, 1).sort(this.sort);
      } else {
        id = index;
        this.users = this.users.filter((item) => {
          return +item.id !== +id;
        }).sort(this.sort);
      }

      const response: any = await this.http.delete(`api/friends/${id}`).toPromise();
      this.users.splice(index, 1).sort(this.sort);
      this.loadFilteredUsers();
      this.emit('USER_IS_DELETED', id);
      this.emit('DATA_IS_CHANGED');
      this.socket.emit(SocketAction.DEL_FRIEND, JSON.stringify({
        id: id,
        user: this.profile.user
      }));
    } catch (res) {
      // console.error(res.error.status, res.error.message);
      throw new Error(res.error.message);
    }
  }

  public async addFriend(index: number): Promise<void> {
    try {
      const response: any = await this.http.post(`api/friends/${index}`, {}).toPromise();
      const user = response.data;
      this.assignLoadedUsers(user);
      this.loadFilteredUsers();
      this.emit('USER_IS_ADDED', index);
      this.emit('DATA_IS_CHANGED');
      this.socket.emit(SocketAction.ADD_FRIEND, JSON.stringify({
        id: index,
        user: this.profile.user
      }));
    } catch (res) {
      // console.error(res.error.status, res.error.message);
      throw new Error(res.error.message);
    }
  }

  public async isFriend(index: number): Promise<boolean> {
    try {
      const r = `api/friends/isfriend/${index}`;
      const response: any = await this.http.get(r).toPromise();
      return response.data;
    } catch (res) {
      // console.error(res.error.status, res.error.message);
      throw new Error(res.error.message);
    }
  }

  private listenSocketEvents(): void {

    this.socket.onEvent(SocketEvent.ADD_FRIEND).subscribe((data) => {
      const user: UserInterface = JSON.parse(data);
      this.assignLoadedUsers(user);
      this.loadFilteredUsers();
      this.emit('USER_IS_ADDED', user.id);
      this.emit('DATA_IS_CHANGED');
    });

    this.socket.onEvent(SocketEvent.DEL_FRIEND).subscribe((data) => {
      const user: UserInterface = JSON.parse(data);
      this.users = this.users.filter((item) => {
        return +item.id !== +user.id;
      });
      this.loadFilteredUsers();
      this.emit('USER_IS_DELETED', user.id);
      this.emit('DATA_IS_CHANGED');
    });

    this.socket.onEvent(SocketEvent.GET_ONLINE).subscribe((data) => {
      const res = JSON.parse(data);
      this.setOnline(res.id, res.result);
    });

    this.socket.onEvent(SocketEvent.OFFLINE).subscribe((data) => {
      this.setOnline(data, false);
    });

    this.socket.onEvent(SocketEvent.ONLINE).subscribe((data) => {
      this.setOnline(data, true);
    });

  }

  private setOnline(id: number, status: boolean): void {
    for (const item of this.users) {
      if (+item.id === +id) {
        item.online = status;
      }
    }
    this.loadFilteredUsers();
    this.emit('DATA_IS_CHANGED');
  }

}
