import { Component, OnInit } from '@angular/core';
import { AsyncLocalStorage } from 'angular-async-local-storage';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private localStorage: AsyncLocalStorage) { }

  ngOnInit() {
  }

  logout() {
    this.localStorage.removeItem('user').subscribe(() => {});
  }

}
