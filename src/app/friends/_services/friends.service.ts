import { Injectable } from '@angular/core';
import { Friend } from '../_classes/friend';
import { EventEmitter } from 'eventemitter3';

@Injectable()
export class FriendsService extends EventEmitter {

  private _search: string;

  public friendsTemp: Friend[];
  public invitesTemp: Friend[];

  public friends: Friend[];
  public invites: Friend[];
  public friendsOnline: Friend[];
  public friendsFavorite: Friend[];
  public friendsInvite: Friend[];

  constructor() {
    super();
    this.friendsTemp = [
      new Friend(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg',
        'Vincent Porter',
        'online',
        false,
        1
      ),
      new Friend(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg',
        'Aiden Chavez',
        'online',
        false,
        2
      ),
      new Friend(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_03.jpg',
        'Vincent Porter',
        'left 30 mins ago',
        true,
        3
      ),
      new Friend(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_04.jpg',
        'Mike Thomas',
        'online',
        false,
        4
      ),
      new Friend(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg',
        'Erica Hughes',
        'left 17 mins ago',
        false,
        5
      ),
      new Friend(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg',
        'Ginger Johnston',
        'online',
        false,
        6
      ),
      new Friend(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_03.jpg',
        'Tracy Carpenter',
        'left 11 mins ago',
        false,
        7
      ),
      new Friend(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_04.jpg',
        'Peyton Mckinney',
        'online',
        true,
        8
      ),
      new Friend(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg',
        'Erica Hughes',
        'left 17 mins ago',
        false,
        9
      ),
      new Friend(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg',
        'Ginger Johnston',
        'online',
        false,
        10
      ),
      new Friend(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_03.jpg',
        'Tracy Carpenter',
        'left 11 mins ago',
        false,
        11
      ),
      new Friend(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_04.jpg',
        'Peyton Mckinney',
        'online',
        false,
        12
      ),
      new Friend(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_04.jpg',
        'Peyton Mckinney',
        'online',
        true,
        13
      ),
      new Friend(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg',
        'Erica Hughes',
        'left 17 mins ago',
        false,
        14
      ),
      new Friend(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg',
        'Ginger Johnston',
        'online',
        false,
        15
      ),
      new Friend(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_04.jpg',
        'Peyton Mckinney',
        'online',
        true,
        16
      ),
      new Friend(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg',
        'Erica Hughes',
        'left 17 mins ago',
        false,
        17
      ),
      new Friend(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg',
        'Ginger Johnston',
        'online',
        false,
        18
      ),
      new Friend(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_04.jpg',
        'Peyton Mckinney',
        'online',
        true,
        19
      ),
      new Friend(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg',
        'Erica Hughes',
        'left 17 mins ago',
        false,
        20
      ),
      new Friend(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg',
        'Ginger Johnston',
        'online',
        false,
        21
      ),
    ];

    this.invitesTemp = [
      new Friend(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_03.jpg',
        'Tracy Carpenter',
        'left 11 mins ago',
        false,
        11
      ),
      new Friend(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_04.jpg',
        'Peyton Mckinney',
        'online',
        false,
        12
      ),
      new Friend(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_04.jpg',
        'Peyton Mckinney',
        'online',
        true,
        13
      ),
      new Friend(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg',
        'Erica Hughes',
        'left 17 mins ago',
        false,
        14
      ),
    ];

    this.friends = this.getFriends();
    this.invites = this.getInvites();
    this.friendsOnline = this.getOnlineFriends();
    this.friendsFavorite = this.getFavoriteFriends();

    this.updateOnSearchChanged();
    this.updateListsOnChangeFriend();
    this.updateInvitesOnRefuse();

  }

  get search(): string {
    return this._search;
  }

  set search(s: string) {
    this._search = s;
    this.emit('searchChanged');
  }

  private updateOnSearchChanged(): void {
    this.on('searchChanged', () => {
      this.updateLists();
    });
  }

  private updateLists(): void {
    this.friends = this.getFilteredFriends();
    this.invites = this.getFilteredInvites();
    this.friendsOnline = this.getFilteredOnlineFriends();
    this.friendsFavorite = this.getFilteredFavoriteFriends();
  }

  private updateListsOnChangeFriend(): void {
    for (let i = 0; i < this.friends.length; i++) {
      const friend = this.friends[i];
      friend.on('change', () => {
        this.updateLists();
      });
    }
  }

  private updateInvitesOnRefuse(): void {

    let len = this.invitesTemp.length;

    for (let i = 0; i < len; i++) {
      const user = this.invitesTemp[i];
      user.on('refuse_friendship', () => {
        len = this.invitesTemp.length;
        this.deleteUserFromInvites(user.id);
        this.updateLists();
      });
    }
  }

  private getFriends(): Friend[] {
    return this.friendsTemp.sort(this.sortFriends);
  }

  private getInvites(): Friend[] {
    return this.invitesTemp.sort(this.sortFriends);
  }

  private getFavoriteFriends(): Friend[] {
    return this.friendsTemp.filter((item) => {
      return item.favorite === true;
    }).sort(this.sortFriends);
  }

  private getOnlineFriends(): Friend[] {
    return this.friendsTemp.filter((item) => {
      return item.online === 'online';
    }).sort(this.sortFriends);
  }

  private getFilteredFriends(): Friend[] {
    return this.friendsTemp.filter((item) => {
      return item.name.match(new RegExp(this.search, 'i'));
    });
  }

  private getFilteredInvites(): Friend[] {
    return this.invitesTemp.filter((item) => {
      return item.name.match(new RegExp(this.search, 'i'));
    });
  }

  private getFilteredOnlineFriends(): Friend[] {
    const onlineFriends = this.getOnlineFriends();
    return onlineFriends.filter((item) => {
      return item.name.match(new RegExp(this.search, 'i'));
    });
  }

  private getFilteredFavoriteFriends(): Friend[] {
    const favoriteFriends = this.getFavoriteFriends();
    return favoriteFriends.filter((item) => {
      return item.name.match(new RegExp(this.search, 'i'));
    });
  }

  private sortFriends(a: Friend, b: Friend): number {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  private deleteUserFromInvites(id: number): void {
    this.invitesTemp = this.invitesTemp.filter((el) => {
      return el.id !== id;
  });
  }
}
