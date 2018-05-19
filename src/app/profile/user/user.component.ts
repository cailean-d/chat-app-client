import { FriendsService } from '../../__services/friends.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class UserComponent implements OnInit, OnDestroy {

  dataLoaded: boolean;
  state: UserState;
  favState: FavoriteState;

  user: UserInterface;

  constructor(
    private profile: ProfileService,
    public friendsService: FriendsService,
    public inviteService: InviteService,
    public favoriteService: FavoriteService,
    private activeRoute: ActivatedRoute,
    private i18n: I18nService,
    private title: Title
  ) {
     this.getUser();
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.favoriteService.removeAllListeners();
    this.friendsService.removeAllListeners();
    this.inviteService.removeAllListeners();
  }

  private getUser() {
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
      this.updateUserStatus();
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

  private updateUserStatus() {
    this.favoriteService.on('USER_IS_DELETED', (data) => {
      if (this.user.id === data) {
        this.favState = FavoriteState.NotFavorite;
      }
    });
    this.favoriteService.on('USER_IS_ADDED', (data) => {
      if (this.user.id === data) {
        this.favState = FavoriteState.Favorite;
      }
    });
    this.friendsService.on('USER_IS_DELETED', (data) => {
      if (this.user.id === data) {
        this.state = UserState.NoFriend;
      }
    });
    this.friendsService.on('USER_IS_ADDED', (data) => {
      if (this.user.id === data) {
        this.state = UserState.Friend;
      }
    });
    this.inviteService.on('USER_IS_DELETED', (data) => {
      if (this.user.id === data) {
        this.state = UserState.NoFriend;
      }
    });
    this.inviteService.on('USER_IS_ADDED', (data) => {
      if (this.user.id === data) {
        this.state = UserState.InvitedByMe;
      }
    });
  }

}
