import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../__services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean>{
    const isLogined: boolean = await this.authService.isLoggedIn();
    if (isLogined) {
      return true;
    } else {
      this.router.navigate(['authe/login']);
      return false;
    }
  }
}
