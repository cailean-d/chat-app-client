export class FriendList {
  protected friendsService: any;
  protected inviteService: any;
  protected friendsRoot: any;
  protected searchInput: any;

  clearSearchField(): void {
    this.friendsService.search = '';
    if (this.inviteService) {
      this.inviteService.search = '';
    }
    this.searchInput.value = '';
    this.scrollToTop();
  }

  scrollToTop(): void {
    this.friendsRoot.friendListScroll.scrollTop = 0;
  }

  updateSearch(): void {
    this.friendsService.search = this.searchInput.value;
    if (this.inviteService) {
      this.inviteService.search = this.searchInput.value;
    }
  }

  updateSearchOnInput(): void {
    this.searchInput.addEventListener('input', () => {
      this.updateSearch();
    });
  }

}
