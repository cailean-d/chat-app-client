import { Injectable } from '@angular/core';
import { Friend } from '../classes/friend';

@Injectable()
export class FriendsService {

  friends: Friend[];

  constructor() {
    this.friends = [
      new Friend(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg',
        'Vincent Porter',
        'online',
        false
      ),
      new Friend(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg',
        'Aiden Chavez',
        'online',
        false
      ),
      new Friend(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_03.jpg',
        'Vincent Porter',
        'left 30 mins ago',
        true
      ),
      new Friend(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_04.jpg',
        'Mike Thomas',
        'online',
        false
      ),
      new Friend(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg',
        'Erica Hughes',
        'left 17 mins ago',
        false
      ),
      new Friend(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg',
        'Ginger Johnston',
        'online',
        false
      ),
      new Friend(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_03.jpg',
        'Tracy Carpenter',
        'left 11 mins ago',
        false
      ),
      new Friend(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_04.jpg',
        'Peyton Mckinney',
        'online',
        true
      ),
      new Friend(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg',
        'Erica Hughes',
        'left 17 mins ago',
        false
      ),
      new Friend(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg',
        'Ginger Johnston',
        'online',
        false
      ),
      new Friend(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_03.jpg',
        'Tracy Carpenter',
        'left 11 mins ago',
        false
      ),
      new Friend(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_04.jpg',
        'Peyton Mckinney',
        'online',
        false
      ),
    ];
  }

  getFavoriteFriends (): Friend[] {
    return this.friends.filter((item) => {
      return item.favorite === true;
    });
  }

  getOnlineFriends (): Friend[] {
    return this.friends.filter((item) => {
      return item.online === 'online';
    });
  }

  getFilteredFriends(filter: string): Friend[] {
    return this.friends.filter((item) => {
      return item.name.match(new RegExp(filter, 'i'));
    });
  }

}
