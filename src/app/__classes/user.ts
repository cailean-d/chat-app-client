import { EventEmitter } from 'eventemitter3';

export class User extends EventEmitter {
  private _id: number;
  private _image: string;
  private _name: string;
  private _online: string | boolean;

  constructor (id, image, name, online) {
    super();
    this.id = id;
    this.image = image;
    this.name = name;
    this.online = online;
  }

  get id(): number {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }

  get image(): string {
    return this._image;
  }

  set image(image: string) {
    this._image = image;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get online(): string | boolean {
    return this._online;
  }

  set online(online: string | boolean) {
    this._online = online;
  }

}
