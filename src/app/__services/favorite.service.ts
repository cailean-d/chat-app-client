import { favoriteArray } from '../__arrays/favorite';
import { Injectable } from '@angular/core';
import { UserInterface } from '../__interfaces/user';
import { User } from '../__classes/user';


@Injectable()
export class FavoriteService {

  private _search: string;

  public users: User[];
  public usersFiltered: User[];

  constructor() {
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
    this.usersFiltered = this.users.filter((item) => {
      return item.name.match(new RegExp(this.search, 'i'));
    });
  }

  public loadUsers(): void {
    const result: Array<UserInterface> = favoriteArray.sort(this.sortFriends);
    const users = this.convertResponseToObject(result);
    this.assignLoadedUsers(users);
  }

  private assignLoadedUsers(users: User[]): void {
    for (const i of users) {
      this.users.push(i);
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
  }

  private sortFriends(a: User | UserInterface, b: User | UserInterface): number {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

}