import { EventEmitter } from 'eventemitter3';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '../__interfaces/response';
import { UserInterface } from '../__interfaces/user';

@Injectable()
export class OwnProfileService extends EventEmitter {

  dataIsLoaded: boolean;

  user: UserInterface;

  constructor(
    private http: HttpClient,
  ) {
    super();
  }

  async getData(): Promise<void> {
    try {
      const response: any = await this.http.get(`api/users/me`).toPromise();
      this.user = response.data as UserInterface;
      this.dataIsLoaded = true;
    } catch (res) {
      console.error(res);
      throw new Error(res);
    }
  }

  async update(): Promise<void> {
    try {
      const response: any = await this.http.patch(`api/users`, this.user).toPromise();
      this.emit('user_update');
    } catch (res) {
      console.error(res);
      throw new Error(res);
    }
  }

  async updateAvatar(file: File): Promise<void> {
    try {
      const data = new FormData();
      data.append('avatar', file, file.name);
      const response: any = await this.http.patch(`api/upload/avatar`, data).toPromise();
      this.user.avatar = response.data;
      this.emit('user_update');
    } catch (res) {
      console.error(res);
      throw new Error(res);
    }
  }

}
