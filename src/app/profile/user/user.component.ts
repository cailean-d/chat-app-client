import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../__services/profile.service';
import { User } from '../../__classes/user';
import { ActivatedRoute } from '@angular/router';
import { FavoriteService } from '../../__services/favorite.service';
import { Title } from '@angular/platform-browser';
import { I18nService } from '../../__services/i18n.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  _user: User;

  get user(): User {
    return this._user;
  }

  set user(u: User) {
    this._user = u;
    // this.user.isFavorite = this.getFavorite();
    // this.title.setTitle(this.user.nickname);
  }

  constructor(
    private profile: ProfileService,
    private activeRoute: ActivatedRoute,
    protected favoriteService: FavoriteService,
    private i18n: I18nService,
    private title: Title
  ) {
     this.getUser();
  }

  ngOnInit() {
    // setTimeout(() => {
    //   this.title.setTitle(this.user.nickname);
    // }, 50);
  }

  async getUser() {
    this.activeRoute.params.subscribe((params) => {
      this.profile.getUser(params.id).then((res) => {
        if (res) {
          this.user = res;
          this.title.setTitle(this.user.name);
        } else {
          this.i18n.translate.get('hint.profile').subscribe((s: string) => {
            this.title.setTitle(s);
          });
        }
      });
    });
  }

  // getFavorite(): boolean {
  //   return !!this.favoriteService.users.find((el: any) => {
  //     return el.id === this.user.id;
  //   });
  // }

  toggleFavorite(): void {
    if (this.user.isFavorite) {
      this.deleteFromFavorite();
    } else {
      this.addToFavorite();
    }
  }

  deleteFromFavorite(): void {
    this.user.isFavorite = false;
    this.favoriteService.deleteUser(this.user.id);
  }

  addToFavorite(): void {
    this.user.isFavorite = true;
    this.favoriteService.addToUser(this.user);
  }

}
