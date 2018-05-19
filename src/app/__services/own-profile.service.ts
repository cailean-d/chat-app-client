import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '../__interfaces/response';
import { UserInterface } from '../__interfaces/user';

@Injectable()
export class OwnProfileService {

  dataIsLoaded: boolean;

  user: UserInterface;

  constructor(private http: HttpClient) { }

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

}
