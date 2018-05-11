import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Response } from '../../__interfaces/response';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  async isLoggedIn(): Promise<boolean> {
    try {
      const response = await this.http.get<Response>('auth/check').toPromise();
      if (response.data) {
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

}
