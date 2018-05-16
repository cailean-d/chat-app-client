export class FriendList {
  protected friendsService: any;
  protected inviteService: any;
  protected onlineService: any;
  protected friendsRoot: any;
  protected searchInput: any;

  clearSearchField(): void {
    if (this.searchInput.value !== '') {
      if (this.inviteService) {
        this.inviteService.search = '';
      }
      if (this.onlineService) {
        this.onlineService.search = '';
      }
      if (this.friendsService) {
        this.friendsService.search = '';
      }
      this.searchInput.value = '';
      this.scrollToTop();
    }
  }

  updateSearchOnInput(): void {
    this.searchInput.addEventListener('input', () => {
      this.updateSearch();
    });
  }

  scrollToTop(): void {
    this.friendsRoot.friendListScroll.scrollTop = 0;
  }

  updateSearch(): void {
    if (this.inviteService) {
      this.inviteService.search = this.searchInput.value;
    }
    if (this.onlineService) {
      this.onlineService.search = this.searchInput.value;
    }
    if (this.friendsService) {
      this.friendsService.search = this.searchInput.value;
    }
  }

}
