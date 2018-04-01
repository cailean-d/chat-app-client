import { Component, OnInit } from '@angular/core';
import { NgForage } from 'ngforage';
import { FriendsService } from '../../friends/_services/friends.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    protected storage: NgForage,
    protected friendService: FriendsService
  ) { }

  ngOnInit() { }

  async logout() {
    await this.storage.removeItem('user');
  }

}
