import { Injectable } from '@angular/core';
import * as Peer from 'js-peer-client';
import { SocketService } from './socket.service';
import { Observable } from 'rxjs/Observable';

export enum PeerEvent {
  CONNECT = 'connect',
  CLOSE = 'close',
  CALL = 'call',
  ANSWER = 'answer',
  STREAM = 'stream',
  ERROR = 'error',
  ERR_STREAM_SUPPORT = 'ERR_STREAM_SUPPORT',
  ERR_WEBRTC_SUPPORT = 'ERR_WEBRTC_SUPPORT',
}

@Injectable()
export class PeerService {

  public peer: any;

  constructor(private socketService: SocketService) {
    setTimeout(() => {
      this.peer = new Peer(socketService.socket);
    }, 1000);
  }

  public on(event: PeerEvent): Observable<any> {
    return new Observable<Event>(observer => {
        this.peer.on(event, (data: any) => observer.next(data));
    });
  }

}
