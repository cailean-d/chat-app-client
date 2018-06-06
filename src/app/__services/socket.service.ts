import { Injectable } from '@angular/core';
import * as ws from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { OwnProfileService } from './own-profile.service';

export enum SocketEvent {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  CHAT_MESSAGE = 'room_message',
  INVITED = 'invited',
  CANCEL_INVITE = 'invite_canceled',
  REJECT_INVITE = 'invite_rejected',
  ADD_FRIEND = 'friend_added',
  DEL_FRIEND = 'friend_deleted',
  GET_ONLINE = 'is_online',
  ONLINE = 'online',
  OFFLINE = 'offline',
  ROOM_INVITE = 'room_invited',
  READ_MESSAGE = 'message_read',
  TYPING = 'typing',
  NOTIFICATION = 'notification'
}

export enum SocketAction {
  ENTER_ROOM = 'room',
  CHAT_MESSAGE = 'room_message',
  INVITE_USER = 'invite',
  CANCEL_INVITE = 'cancel_invite',
  REJECT_INVITE = 'reject_invite',
  ADD_FRIEND = 'add_friend',
  DEL_FRIEND = 'del_friend',
  GET_ONLINE = 'get_online',
  ROOM_INVITE = 'invite_room',
  READ_MESSAGE = 'read_message',
  TYPING = 'typing'
}

@Injectable()
export class SocketService {

  private socket: SocketIOClient.Socket;

  constructor(private profile: OwnProfileService) {}

  public async connect(): Promise<void> {
    if (!this.profile.dataIsLoaded) {
      await this.profile.getData();
    }
    this.socket = ws.connect({ query: { id: this. profile.user.id}, secure: true });
  }

  public disconnect(): void {
    this.socket.close();
  }

  public send(message: any): void {
    this.socket.emit('message', message);
  }

  public emit(event: SocketAction, message: any): void {

    let data;

    if (typeof message === 'object') {
      data = JSON.stringify(message);
    } else {
      data = message;
    }

    this.socket.emit(event, data);

  }

  public onMessage(): Observable<any> {
      return new Observable<any>(observer => {
          this.socket.on('message', (data: any) => observer.next(data));
      });
  }

  public onEvent(event: SocketEvent): Observable<any> {
      return new Observable<Event>(observer => {
          this.socket.on(event, (data: any) => observer.next(data));
      });
  }

}
