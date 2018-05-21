export class User {
  public id: number;
  public image: string;
  public name: string;
  public online: string | boolean;
  public isFavorite: boolean;
  public isFriend: boolean;

  public avatar?: string;
  public nickname?: string;
  public city?: string;
  public country?: string;
  public gender?: string;
  public phone?: string;
  public website?: string;
  public address?: string;

  constructor (id, image, name, online) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.online = online;
  }

}
