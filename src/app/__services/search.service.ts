import { UserInterface } from '../__interfaces/user';
import { Injectable } from '@angular/core';
import { User } from '../__classes/user';
import { usersArray } from '../__arrays/users';

@Injectable()
export class SearchService {

  private _search: string;
  private dataIsLoading: boolean;

  private usersLoaded: number;
  private loadQuantity: number;

  private usersFilteredLoaded: number;
  private filteredLoadQuantity: number;
  private index: number;

  public users: User[];
  public usersFiltered: User[];

  constructor() {
    this.usersLoaded = 0;
    this.loadQuantity = 5;
    this.usersFilteredLoaded = 0;
    this.filteredLoadQuantity = 5;
    this.index = usersArray.length - 1;
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

  public loadFilteredUsers(): void {
    if (!this.dataIsLoading) {
      if (this.index > 0) {
        this.dataIsLoading = true;
        const result: Array<UserInterface> = [];
        let counter = 0;
        for (let i = this.index; i >= 0; i--) {
          this.index = i - 1;
          const element = usersArray[i];
          if (element.name.match(new RegExp(this.search, 'i'))) {
            counter++;
            result.push(element);
            if (counter === this.filteredLoadQuantity) {
              const usersx = this.convertResponseToObject(result);
              this.assignLoadedFilteredUsers(usersx);
              this.usersFilteredLoaded += this.filteredLoadQuantity;
              this.dataIsLoading = false;
              return;
            }
          }
        }
        const users = this.convertResponseToObject(result);
        this.assignLoadedFilteredUsers(users);
        this.dataIsLoading = false;
      }
    }
  }

  public loadUsers(): void {
    if (!this.dataIsLoading) {
      if (this.usersLoaded < usersArray.length) {
        this.dataIsLoading = true;
        const result: Array<UserInterface> = [];
        const a = usersArray.length - this.usersLoaded - 1;
        const b = usersArray.length - (this.usersLoaded + this.loadQuantity) - 1;
        for (let i = a; i > b; i--) {
          const element = usersArray[i];
          if (element) {
            result.push(element);
          }
        }
        const users = this.convertResponseToObject(result);
        this.assignLoadedUsers(users);
        this.usersLoaded += this.loadQuantity;
        this.dataIsLoading = false;
      }
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
      arr.push(new User(i.id, i.image, i.name, i.online));
    }
    return arr;
  }

  private clearFilter(): void {
    this.usersFiltered = [];
    this.usersFilteredLoaded = 0;
    this.index = usersArray.length - 1;
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
