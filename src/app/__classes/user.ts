import { favoriteArray } from '../__arrays/favorite';

export class User {
  public id: number;
  public image: string;
  public name: string;
  public online: string | boolean;
  public isFavorite: boolean;
  public isFriend: boolean;

  constructor (id, image, name, online) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.online = online;
    this.getFavorite();
  }

  public toggleFavorite(): void {
    if (this.isFavorite) {
      this.deleteFromFavorite();
    } else {
      this.addToFavorite();
    }
  }

  private getFavorite(): void {
    const result = favoriteArray.find((element: any) => {
      if (element.id === this.id) {
        return element;
      }
    });

    if (result) {
      this.isFavorite = true;
    } else {
      this.isFavorite = false;
    }
  }

  private addToFavorite(): void {
    this.isFavorite = true;
  }

  private deleteFromFavorite(): void {
    this.isFavorite = false;
  }

}
