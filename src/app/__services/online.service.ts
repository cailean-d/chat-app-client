import { UserInterface } from '../__interfaces/user';
import { User } from '../__classes/user';
import { Injectable } from '@angular/core';
import { FriendsService } from './friends.service';

@Injectable()
export class OnlineService {

  private _search: string;

  public users: User[];
  public usersFiltered: User[];

  constructor(private friendsService: FriendsService) {
    this.loadData();
    this.updateDataOnFriendsChange();
  }

  get search(): string {
    return this._search;
  }

  set search(s: string) {
    this._search = s;
    this.clearFilter();
    this.loadFilteredUsers();
  }

  private loadData(): void {
    this.users = [];
    this.usersFiltered = [];
    this.loadUsers();
    this.loadFilteredUsers();
  }

  private updateDataOnFriendsChange(): void {
    this.friendsService.on('change', () => {
      this.loadData();
    });
  }

  private clearFilter(): void {
    this.usersFiltered = [];
  }

  private loadFilteredUsers(): void {
    this.usersFiltered = this.users.filter((item) => {
      return item.name.match(new RegExp(this.search, 'i'));
    });
  }

  private loadUsers(): void {
    const result: Array<User> = this.friendsService.users.filter((item) => {
      return item.online === true;
    });
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

  private sort(a: User | UserInterface, b: User | UserInterface): number {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

}
