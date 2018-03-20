import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgForage } from 'ngforage';

@Injectable()
export class AuthService {

  constructor(private storage: NgForage) {}

  async isLoggedIn(): Promise<boolean> {
    const res = await this.storage.getItem('user');

    if (res) {
      return true;
    } else {
      return false;
    }
  }

}
