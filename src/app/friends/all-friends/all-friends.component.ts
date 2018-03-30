import { Component, OnInit, ElementRef } from '@angular/core';
import { FriendsService } from '../services/friends.service';
import { FriendsRootComponent } from '../friends-root/friends-root.component';

@Component({
  selector: 'app-all-friends',
  templateUrl: './all-friends.component.html',
  styleUrls: ['./all-friends.component.scss']
})
export class AllFriendsComponent implements OnInit {

  constructor(
    private friendsService: FriendsService,
    private friendsRoot: FriendsRootComponent
  ) { }

  friendsAll = this.friendsService.friends;
  friends = this.friendsService.friends;
  searchField: ElementRef = this.friendsRoot.search;

  ngOnInit() {
    this.searchField.nativeElement.addEventListener('input', () => {
      this.getFilteredFriends();
    });
  }

  getFilteredFriends (): void {
    const filter: string = this.searchField.nativeElement.value;
    this.friends = this.friendsService.getFilteredFriends(filter);
  }

}
