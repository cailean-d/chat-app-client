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

  constructor(private http: HttpClient, private friendsService: FriendsService) {
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
      const r = `api/invites/${this.users[index].id}`;
      const response: any = await this.http.delete(r).toPromise();
      this.users.splice(index, 1).sort(this.sort);
      this.loadFilteredUsers();
      this.emit('USER_IS_DELETED');
      this.emit('DATA_IS_CHANGED');
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
      this.emit('USER_IS_ADDED');
      this.emit('DATA_IS_CHANGED');
    } catch (err) {
      // console.error(res.error.status, res.error.message);
      throw new Error(err);
    }
  }

  public async addToFriends(index: number): Promise<void> {
    try {
      await this.friendsService.addFriend(this.users[index].id);
      this.users.splice(index, 1).sort(this.sort);
      this.loadFilteredUsers();
      this.emit('DATA_IS_CHANGED');
    } catch (err) {
      // console.error(res.error.status, res.error.message);
      throw new Error(err);
    }
  }

  public async addToFriendsById(index: number): Promise<void> {
    try {
      await this.friendsService.addFriend(index);
      this.users = this.users.filter((item) => {
        return item.id !== index;
      });
      this.loadFilteredUsers();
      this.emit('DATA_IS_CHANGED');
    } catch (err) {
      // console.error(res.error.status, res.error.message);
      throw new Error(err);
    }
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

  public async cancelMyInvite(index: number): Promise<void> {
    try {
      const r = `api/invites/me/${this.users[index].id}`;
      const response: any = await this.http.delete(r).toPromise();
      this.emit('USER_IS_DELETED');
      this.emit('DATA_IS_CHANGED');
    } catch (err) {
      // console.error(res.error.status, res.error.message);
      throw new Error(err);
    }
  }

}
