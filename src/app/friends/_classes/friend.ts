import { EventEmitter } from 'eventemitter3';

export class Friend extends EventEmitter {
  private _image: string;
  private _name: string;
  private _online: string;
  private _favorite: boolean;

  constructor (image, name, online, favorite) {
    super();
    this.image = image;
    this.name = name;
    this.online = online;
    this.favorite = favorite;
  }

  get image(): string {
    return this._image;
  }

  set image(image: string) {
    this._image = image;
    this.emit('change');
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
    this.emit('change');
  }

  get online(): string {
    return this._online;
  }

  set online(online: string) {
    this._online = online;
    this.emit('change');
  }

  get favorite(): boolean {
    return this._favorite;
  }

  set favorite(fav: boolean) {
    this._favorite = fav;
    this.emit('change');
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
