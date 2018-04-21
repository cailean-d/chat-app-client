import { UserInterface } from '../__interfaces/user';
import { Injectable } from '@angular/core';
import { invitesArray } from '../__arrays/invites';
import { User } from '../__classes/user';

@Injectable()
export class InviteService {

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

  private clearFilter(): void {
    this.usersFiltered = [];
  }

  public loadFilteredUsers(): void {
    this.usersFiltered = this.users.filter((item) => {
      return item.name.match(new RegExp(this.search, 'i'));
    });
  }

  public loadUsers(): void {
    const result: Array<UserInterface> = invitesArray.sort(this.sortFriends);
    const users = this.convertResponseToObject(result);
    this.assignLoadedUsers(users);
  }

  private convertResponseToObject(obj: Array<UserInterface>): User[] {
    const arr: User[] = [];
    for (const i of obj) {
      arr.push(new User(i.id, i.image, i.name, i.online));
    }
    return arr;
  }

  private assignLoadedUsers(users: User[]): void {
    for (const i of users) {
      this.users.push(i);
    }
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
