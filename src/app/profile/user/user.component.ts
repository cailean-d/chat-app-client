import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../__services/profile.service';
import { User } from '../../__classes/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: User;

  constructor(
    private profile: ProfileService,
    private activeRoute: ActivatedRoute
  ) {
     this.getUser();
  }

  ngOnInit() { }

  getUser() {
    this.activeRoute.params.subscribe((params) => {
      this.user = this.profile.getUser(params.id);
    });
  }

}
