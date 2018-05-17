import { FriendsService } from '../../__services/friends.service';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../__services/profile.service';
import { ActivatedRoute } from '@angular/router';
import { FavoriteService } from '../../__services/favorite.service';
import { Title } from '@angular/platform-browser';
import { I18nService } from '../../__services/i18n.service';
import { UserInterface } from '../../__interfaces/user';
import { InviteService } from '../../__services/invite.service';

enum UserState { IamInvited, InvitedByMe, Friend, NoFriend }
enum FavoriteState { Favorite, NotFavorite }

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  dataLoaded: boolean;
  state: UserState;
  favState: FavoriteState;

  _user: UserInterface;

  get user(): UserInterface {
    return this._user;
  }

  set user(u: UserInterface) {
    this._user = u;
    // this.user.isFavorite = this.getFavorite();
    // this.title.setTitle(this.user.nickname);
  }

  constructor(
    private profile: ProfileService,
    public friendsService: FriendsService,
    public inviteService: InviteService,
    private activeRoute: ActivatedRoute,
    protected favoriteService: FavoriteService,
    private i18n: I18nService,
    private title: Title
  ) {
     this.getUser();
  }

  ngOnInit() { }

  getUser() {
    this.activeRoute.params.subscribe((params) => {
      this.profile.getUser(params.id).then((res) => {
        if (res) {
          this.user = res;
          this.getUserStatus(this.user.id);
          this.title.setTitle(this.user.nickname);
        } else {
          this.i18n.translate.get('hint.profile').subscribe((s: string) => {
            this.title.setTitle(s);
          });
        }
      });
    });
  }

  async getUserStatus(id: number): Promise<void> {
    const a = await this.inviteService.isInvited(id);
    try {
      if (a) {
        this.state = UserState.InvitedByMe;
      } else {
        const b = await this.inviteService.meIsInvited(id);
        if (b) {
          this.state = UserState.IamInvited;
        } else {
          const c = await this.friendsService.isFriend(id);
          if (c) {
            this.state = UserState.Friend;
          } else {
            this.state = UserState.NoFriend;
          }
        }
      }

      const isFavorite = this.favoriteService.users.some(e => e.id === id);

      if (isFavorite) {
        this.favState = FavoriteState.Favorite;
      } else {
        this.favState = FavoriteState.NotFavorite;
      }

    } catch (error) {
      console.log(error);
    } finally {
      this.dataLoaded = true;
    }

  }

  private addToFriends(): void {
    this.inviteService.addToFriendsById(this.user.id).then(() => { this.state = UserState.Friend; });
  }

  private deleteFromFriends(): void {
    this.friendsService.deleteFriend(this.user.id).then(() => { this.state = UserState.NoFriend; });
  }

  private inviteUser(): void {
    this.inviteService.inviteUser(this.user.id).then(() => { this.state = UserState.InvitedByMe; });
  }

  private cancelInvite(): void {
    this.inviteService.cancelMyInvite(this.user.id).then(() => { this.state = UserState.NoFriend; });
  }

  private rejectInvite(): void {
    this.inviteService.deleteInvite(this.user.id).then(() => { this.state = UserState.NoFriend; });
  }

  private addToFavorite(): void {
    this.favoriteService.addFavorite(this.user.id).then(() => { this.favState = FavoriteState.Favorite; });
  }

  private deleteFromFavorite(): void {
    this.favoriteService.deleteFavoriteById(this.user.id)
    .then(() => { this.favState = FavoriteState.NotFavorite; });
  }

}
