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
  }

}
