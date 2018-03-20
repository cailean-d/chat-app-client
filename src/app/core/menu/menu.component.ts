import { Component, OnInit } from '@angular/core';
import { NgForage } from 'ngforage';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private storage: NgForage) { }

  ngOnInit() {
  }

  async logout() {
    await this.storage.removeItem('user');
  }

}
