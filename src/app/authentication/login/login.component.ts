import { Component, OnInit } from '@angular/core';
import { AsyncLocalStorage } from 'angular-async-local-storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private localStorage: AsyncLocalStorage) { }

  ngOnInit() {
  }

  login() {
    this.localStorage.setItem('user', true).subscribe(() => {});
  }

}
