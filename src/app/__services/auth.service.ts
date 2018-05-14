import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Response } from '../__interfaces/response';
import { Router } from '@angular/router';
import { NgForage } from 'ngforage';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: NgForage,
  ) {}

  async isLoggedIn(): Promise<boolean> {
    try {
      const response = await this.http.get<Response>('auth/check').toPromise();
      if (response.data) {
        this.getUser();
        return true;
      } else {
        return false;
      }

    } catch (error) {
      console.error(error);
    }

  }

  async regUser(nickname: string, email: string, password: string): Promise<void> {
    try {

      const response = await this.http.post<Response>('auth/reg', {
        nickname: nickname,
        email: email,
        password: password
      }).toPromise();

    } catch (err) {
      throw new Error(err.error.message);
    }

  }

  async login(email: string, password: string): Promise<{}> {
    try {

      const response = await this.http.post<Response>('auth/login/local', {
        email: email,
        password: password
      }).toPromise();


      return response.data;

    } catch (err) {
      throw new Error(err.error.message);
    }

  }

  async logout(): Promise<void> {
    try {
      const response = await this.http.delete<Response>('auth/logout').toPromise();
    } catch (err) {
      throw new Error(err.error.message);
    }
  }

  private async getUser(): Promise<void> {
    const user = await this.storage.getItem('user');
    if (!user) {
      const responseUser = await this.http.get<Response>('api/users/me').toPromise();
      await this.storage.setItem('user', responseUser.data);
    }
  }

}
