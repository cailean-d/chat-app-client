import { Injectable } from '@angular/core';
import { UserInterface } from '../__interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Response } from '../__interfaces/response';
import { EventEmitter } from 'eventemitter3';

@Injectable()
export class ProfileService  extends EventEmitter {

  constructor(private http: HttpClient) {
    super();
  }

  async getUser(id: number): Promise<UserInterface> {
    try {
      const r = `api/users/${id}`;
      const response: any = await this.http.get(r).toPromise();

      const user: UserInterface = response.data;
      return user;

    } catch (res) {
      console.error(res.error.status, res.error.message);
      return undefined;
    }
  }

}
