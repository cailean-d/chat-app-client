import { HttpClient, HttpParams } from '@angular/common/http';
import { UserInterface } from '../__interfaces/user';
import { Injectable } from '@angular/core';
import { User } from '../__classes/user';
import { usersArray } from '../__arrays/users';
import { Response } from '../__interfaces/response';

@Injectable()
export class SearchService {

  private _search: string;
  private dataIsLoading: boolean;

  private usersLoaded: number;
  private loadQuantity: number;

  private usersFilteredLoaded: number;
  private stopLoading;

  public users: User[];
  public usersFiltered: User[];


  public oldSearch: string;

  constructor(private http: HttpClient) {
    this.loadQuantity = 20;
    this.usersLoaded = 0;
    this.usersFilteredLoaded = 0;
    this.users = [];
    this.usersFiltered = [];
    this.search = '';
    this.oldSearch = '';
    this.loadUsers();
    this.loadFilteredUsers();
  }

  get search(): string {
    return this._search;
  }

  set search(s: string) {
    this.oldSearch = this.search;
    this._search = s;
    this.clearFilter();
    this.loadFilteredUsers();
  }

  public loadFilteredUsers(): void {

    if (!this.dataIsLoading && !this.stopLoading) {
      this.dataIsLoading = true;

      const Params = new HttpParams({
        fromObject: {
          offset: this.usersFilteredLoaded.toString(),
          limit: this.loadQuantity.toString(),
          name: this.search
        }
      });

      this.http.get<Response>('api/users', {params: Params}).subscribe(
        response => {
          const res: Response = response;
          const users: Array<UserInterface> = response.data;

          if (this.search !== this.oldSearch) {
            this.usersFiltered = [];
          }

          if (users.length > 0) {
            const usersx = this.convertResponseToObject(users).sort(this.sortFriends);
            this.assignLoadedFilteredUsers(usersx);
            this.usersFilteredLoaded += this.loadQuantity;
          } else {
            this.stopLoading = true;
          }
          this.dataIsLoading = false;
        },
        error => {
          console.error(error);
          this.dataIsLoading = false;
        }
      );
    }
  }

  public loadUsers(): void {

    if (!this.dataIsLoading && !this.stopLoading) {
        this.dataIsLoading = true;

        const Params = new HttpParams({
          fromObject: {
            offset: this.usersLoaded.toString(),
            limit: this.loadQuantity.toString(),
          }
        });

        this.http.get<Response>('api/users', {params: Params}).subscribe(
          response => {
            const res: Response = response;
            const users: Array<UserInterface> = response.data;
            if (users.length > 0) {
              const usersx = this.convertResponseToObject(users).sort(this.sortFriends);
              this.assignLoadedUsers(usersx);
              this.usersLoaded += this.loadQuantity;
            } else {
              this.stopLoading = true;
            }
            this.dataIsLoading = false;
          },
          error => {
            console.error(error);
            this.dataIsLoading = false;
          }
        );
    }

  }

  private assignLoadedUsers(users: User[]): void {
    for (const i of users) {
      this.users.push(i);
    }
  }

  private assignLoadedFilteredUsers(users: User[]): void {
    for (const i of users) {
      this.usersFiltered.push(i);
    }
  }

  private convertResponseToObject(obj: Array<UserInterface>): User[] {
    const arr: User[] = [];
    for (const i of obj) {
      arr.push(new User(i.id, i.avatar, i.nickname, i.online));
    }
    return arr;
  }

  private clearFilter(): void {
    this.stopLoading = false;
    this.usersFilteredLoaded = 0;
  }

  private sortFriends(a: User, b: User): number {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

}
