export class Friend {
  image: string;
  name: string;
  online: string;
  favorite: boolean;

  constructor (image, name, online, favorite) {
    this.image = image;
    this.name = name;
    this.online = online;
    this.favorite = favorite;
  }

  setFavorite () {
    this.favorite = true;
  }

  removeFavorite () {
    this.favorite = false;
  }

  toggleFavorite () {
    this.favorite = !this.favorite;
  }
}
