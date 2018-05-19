import { Injectable } from '@angular/core';
import * as ws from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

export enum Event {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect'
}

@Injectable()
export class SocketService {

  private socket: SocketIOClient.Socket;

  constructor() {
    this.initSocket();
    this.socket.on('connect', function() {
      console.log('connected');
   });
  }

  private initSocket(): void {
    this.socket = ws.connect();
  }

  public send(message: any): void {
    this.socket.emit('message', message);
  }

  public emit(event: string, message: any): void {
    this.socket.emit(event, message);
  }

  public onMessage(): Observable<any> {
      return new Observable<any>(observer => {
          this.socket.on('message', (data: any) => observer.next(data));
      });
  }

  public onEvent(event: string): Observable<any> {
      return new Observable<Event>(observer => {
          this.socket.on(event, () => observer.next());
      });
  }

}
