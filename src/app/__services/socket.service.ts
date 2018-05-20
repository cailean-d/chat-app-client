import { Injectable } from '@angular/core';
import * as ws from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { OwnProfileService } from './own-profile.service';

export enum SocketEvent {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  CHAT_MESSAGE = 'room_message',
}

export enum SocketAction {
  ENTER_ROOM = 'room',
  CHAT_MESSAGE = 'room_message',
}

@Injectable()
export class SocketService {

  private socket: SocketIOClient.Socket;

  constructor(private profile: OwnProfileService) {
    this.initSocket();
  }

  private async initSocket(): Promise<void> {
    if (!this.profile.dataIsLoaded) {
      await this.profile.getData();
    }
    this.socket = ws.connect({ query: { id: this. profile.user.id} });
  }

  public send(message: any): void {
    this.socket.emit('message', message);
  }

  public emit(event: string, message: any): void {

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

  public onEvent(event: string): Observable<any> {
      return new Observable<Event>(observer => {
          this.socket.on(event, (data: any) => observer.next(data));
      });
  }

}
