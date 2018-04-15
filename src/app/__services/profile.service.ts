import { Injectable } from '@angular/core';
import { User } from '../__classes/user';
import { usersArray } from '../__arrays/users';
import { UserInterface } from '../__interfaces/user';

@Injectable()
export class ProfileService {

  getUser(id: number): User {
    const response = usersArray.find((el) => {
      return el.id === +id;
    });
    if (response) {
      const user = this.convertResponseToObject(response);
      return user;
    } else {
      return undefined;
    }
  }

  private convertResponseToObject(user: UserInterface): User {
    return new User(user.id, user.image, user.name, user.online);
  }

}
