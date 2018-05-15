import { HttpClient, HttpParams } from '@angular/common/http';
import { UserInterface } from '../__interfaces/user';
import { Injectable } from '@angular/core';
import { User } from '../__classes/user';
import { usersArray } from '../__arrays/users';
import { Response } from '../__interfaces/response';
import { NgForage } from 'ngforage';

@Injectable()
export class SearchService {

  private _search: string;

  private dataIsLoading: boolean;
  private loadQuantity = 20;
  private usersFilteredLoaded = 0;
  private stopLoading;

  public oldSearch: string;
  public usersFiltered: User[];

  constructor(private http: HttpClient, private storage: NgForage) {
    this.usersFiltered = [];
    this.search = '';
    this.oldSearch = '';
    this.loadUsers();
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

  public async loadUsers(): Promise<void>   {

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
        const users: Array<UserInterface> = res.data;

        const usersx = await this.convertResponseToObject(users);

        if (this.search !== this.oldSearch) {
          this.usersFiltered = [];
        }

        if (usersx.length > 0) {
          this.assignLoadedUsers(usersx);
          this.usersFilteredLoaded += this.loadQuantity;
        } else {
          this.stopLoading = true;
        }
        this.dataIsLoading = false;
      } catch (error) {
        console.error(error);
        this.dataIsLoading = false;
      }
    }
  }

  private async convertResponseToObject(obj: Array<UserInterface>): Promise<User[]> {
    const users = await this.delOwnProfile(obj);
    const arr: User[] = [];
    for (const i of users) {
      arr.push(new User(i.id, i.avatar, i.nickname, i.online));
    }
    return arr;
  }

  private assignLoadedUsers(users: User[]): void {
    for (const i of users) {
      this.usersFiltered.push(i);
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

}
