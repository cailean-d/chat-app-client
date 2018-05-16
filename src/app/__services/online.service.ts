import { UserInterface } from '../__interfaces/user';
import { User } from '../__classes/user';
import { Injectable } from '@angular/core';
import { FriendsService } from './friends.service';

@Injectable()
export class OnlineService {

  private _search: string;

  public users: UserInterface[];
  public usersFiltered: UserInterface[];

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
    this.friendsService.on('DATA_IS_CHANGED', () => {
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
    const result: Array<UserInterface> = this.friendsService.users.filter((item) => {
      return item.online === true;
    });
    this.assignLoadedUsers(result);
  }

  private assignLoadedUsers(users: UserInterface[]): void {
    for (const i of users) {
      this.users.push(i);
    }
    this.users.sort(this.sort);
  }

  private sort(a: UserInterface, b: UserInterface): number {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

}
