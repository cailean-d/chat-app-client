import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { OwnProfileService } from './own-profile.service';
import { SocketService, SocketEvent, SocketAction } from './socket.service';
import { UserInterface } from '../__interfaces/user';
import { Injectable} from '@angular/core';
import { EventEmitter } from 'eventemitter3';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Response } from '../__interfaces/response';
import { FriendsService } from './friends.service';

@Injectable()
export class InviteService extends EventEmitter {

  private _search: string;

  public users: UserInterface[];
  public usersFiltered: UserInterface[];

  public dataIsLoaded: boolean;

  private invitesCount = new BehaviorSubject<number>(0);
  public countCast = this.invitesCount.asObservable();

  constructor(
    private http: HttpClient,
    private friendsService: FriendsService,
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

  private setCount(n: number): void {
    this.invitesCount.next(n);
  }

  private clearFilter(): void {
    this.usersFiltered = [];
  }

  public async loadUsers(): Promise<void> {
    try {
      const res: Response = await this.http.get<Response>('api/invites').toPromise();
      const u: Array<UserInterface> = res.data;
      this.assignLoadedUsers(u);
      this.loadFilteredUsers();
      this.emit('DATA_IS_LOADED');
      this.dataIsLoaded = true;
    } catch (res) {
      // console.error(res.error.status, res.error.message);
      throw new Error(res);
    }
  }

  public loadFilteredUsers(): void {
    this.usersFiltered = this.users.filter((item) => {
      return item.nickname.match(new RegExp(this.search, 'i'));
    });
    this.setCount(this.users.length);
  }

  public async getMyInvites(): Promise<UserInterface[]> {
    try {
      const res: Response = await this.http.get<Response>('api/invites/me').toPromise();
      return res.data;
    } catch (res) {
      // console.error(res.error.status, res.error.message);
      throw new Error(res);
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

  public async deleteInvite(index: number): Promise<void> {
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

      const r = `api/invites/${id}`;
      const response: any = await this.http.delete(r).toPromise();
      this.loadFilteredUsers();
      this.emit('USER_IS_DELETED', id);
      this.emit('DATA_IS_CHANGED');
      this.socket.emit(SocketAction.REJECT_INVITE, JSON.stringify({
        id: id,
        user: this.profile.user
      }));
    } catch (err) {
      // console.error(res.error.status, res.error.message);
      throw new Error(err);
    }
  }

  public async inviteUser(index: number): Promise<void> {
    try {
      const r = `api/invites/${index}`;
      const response: any = await this.http.post(r, {}).toPromise();
      const user = response.data;
      this.assignLoadedUsers(user);
      this.loadFilteredUsers();
      this.emit('USER_IS_ADDED', index);
      this.emit('DATA_IS_CHANGED');
      this.socket.emit(SocketAction.INVITE_USER, JSON.stringify({
        id: index,
        user: this.profile.user
      }));
    } catch (err) {
      // console.error(res.error.status, res.error.message);
      throw new Error(err);
    }
  }

  public async addToFriends(index: number): Promise<void> {
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

      await this.friendsService.addFriend(id);
      this.loadFilteredUsers();
      this.emit('DATA_IS_CHANGED');
    } catch (err) {
      // console.error(res.error.status, res.error.message);
      throw new Error(err);
    }
  }

  public async cancelMyInvite(index: number): Promise<void> {
    try {
      let id;

      if (this.users[index]) {
        id = this.users[index].id;
      } else {
        id = index;
      }

      const response: any = await this.http.delete(`api/invites/me/${id}`).toPromise();
      this.emit('USER_IS_DELETED', id);
      this.emit('DATA_IS_CHANGED');
      this.socket.emit(SocketAction.CANCEL_INVITE, JSON.stringify({
        id: id,
        user: this.profile.user
      }));
    } catch (err) {
      // console.error(res.error.status, res.error.message);
      throw new Error(err);
    }
  }

  public async isInvited(index: number): Promise<boolean> {
    try {
      const r = `api/invites/isinvited/${index}`;
      const res: Response = await this.http.get<Response>(r).toPromise();
      return res.data;
    } catch (res) {
      // console.error(res.error.status, res.error.message);
      throw new Error(res);
    }
  }

  public async meIsInvited(index: number): Promise<boolean> {
    try {
      const r = `api/invites/isinvited/me/${index}`;
      const res: Response = await this.http.get<Response>(r).toPromise();
      return res.data;
    } catch (res) {
      // console.error(res.error.status, res.error.message);
      throw new Error(res);
    }
  }

  private listenSocketEvents(): void {

    this.socket.onEvent(SocketEvent.INVITED).subscribe((data) => {
      const user: UserInterface = JSON.parse(data);
      this.assignLoadedUsers(user);
      this.loadFilteredUsers();
      this.emit('ME_IS_ADDED', user.id);
      this.emit('DATA_IS_CHANGED');
    });

    this.socket.onEvent(SocketEvent.CANCEL_INVITE).subscribe((data) => {
      const user: UserInterface = JSON.parse(data);
      this.users = this.users.filter((item) => {
        return +item.id !== +user.id;
      });
      this.loadFilteredUsers();
      this.emit('USER_IS_DELETED', user.id);
      this.emit('DATA_IS_CHANGED');
    });

    this.socket.onEvent(SocketEvent.REJECT_INVITE).subscribe((data) => {
      const user: UserInterface = JSON.parse(data);
      this.emit('USER_IS_DELETED', user.id);
    });

  }

}
