import { HttpClient, HttpParams } from '@angular/common/http';
import { UserInterface } from '../__interfaces/user';
import { Injectable } from '@angular/core';
import { Response } from '../__interfaces/response';
import { NgForage } from 'ngforage';
import { EventEmitter } from 'eventemitter3';
import { SocketService, SocketAction, SocketEvent } from './socket.service';

@Injectable()
export class SearchService extends EventEmitter {

  private _search: string;

  private dataIsLoading: boolean;
  private loadQuantity = 20;
  private usersFilteredLoaded = 0;
  private stopLoading;
  public dataIsLoaded: boolean;

  public oldSearch: string;
  public usersFiltered: UserInterface[];

  constructor(
    private http: HttpClient,
    private storage: NgForage,
    private socket: SocketService
  ) {
    super();
    this.usersFiltered = [];
    this.search = '';
    this.oldSearch = '';
    this.loadUsers();
    this.listenSocketEvents();
  }

  get search(): string {
    return this._search;
  }

  set search(s: string) {
    this.oldSearch = this.search;
    this._search = s;
    this.clearFilter();
    this.loadUsers();
  }

  public async loadUsers(): Promise<void> {

    if (!this.dataIsLoading && !this.stopLoading) {
      this.dataIsLoading = true;

      const Params = new HttpParams({
        fromObject: {
          offset: this.usersFilteredLoaded.toString(),
          limit: this.loadQuantity.toString(),
          name: this.search
        }
      });

      try {
        const res: Response = await this.http.get<Response>('api/users', {params: Params}).toPromise();
        let users: Array<UserInterface> = res.data;

        if (this.search !== this.oldSearch) {
          this.usersFiltered = [];
        }

        users = await this.delOwnProfile(users);

        if (users.length > 0) {
          await this.assignLoadedUsers(users);
          this.usersFilteredLoaded += this.loadQuantity;
        } else {
          this.stopLoading = true;
        }

        this.dataIsLoading = false;
        this.dataIsLoaded = true;
        this.emit('DATA_IS_LOADED');
      } catch (error) {
        console.error(error);
        this.dataIsLoading = false;
      }
    }
  }

  private async assignLoadedUsers(users: UserInterface[]): Promise<void> {
    for (const i of users) {
      this.usersFiltered.push(i);
      this.socket.emit(SocketAction.GET_ONLINE, i.id);
    }
  }

  private clearFilter(): void {
    this.stopLoading = false;
    this.usersFilteredLoaded = 0;
  }

  private async delOwnProfile(obj: Array<UserInterface>): Promise<Array<UserInterface>> {
    const user = await this.storage.getItem('user') as UserInterface;
    obj = obj.filter(function(o) {
      return o.id !== user.id;
    });
    return obj;
  }

  private setOnline(id: number, status: boolean): void {
    for (const item of this.usersFiltered) {
      if (+item.id === +id) {
        item.online = status;
      }
    }
  }

  private updateUser(id: number, data: UserInterface) {
    for (let i = 0; i < this.usersFiltered.length; i++) {
      if (+this.usersFiltered[i].id === +id) {
        this.usersFiltered[i] = data;
        if (this.usersFiltered[i].online === 'ONLINE') {
          this.usersFiltered[i].online = true;
        }
      }
    }
  }

  private listenSocketEvents() {

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

    this.socket.onEvent(SocketEvent.USER_UPDATE).subscribe((data) => {
      const d = JSON.parse(data);
      this.updateUser(d.id, d);
    });

  }

}
