import { Injectable } from '@angular/core';
import { User } from '../__classes/user';
import { usersArray } from '../__arrays/users';
import { UserInterface } from '../__interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Response } from '../__interfaces/response';

@Injectable()
export class ProfileService {

  constructor(private http: HttpClient) {

  }

  async getUser(id: number): Promise<User> {
    try {
      const r = `api/users/${id}`;
      const response: any = await this.http.get(r).toPromise();

      const _user: UserInterface = response.data;
      const user: User = this.convertResponseToObject(_user);
      return user;

    } catch (res) {
      console.error(res.error.status, res.error.message);
      return undefined;
    }
  }

  private convertResponseToObject(user: UserInterface): User {
    return new User(user.id, user.avatar, user.nickname, user.online);
  }

}
