import { EventEmitter } from 'eventemitter3';
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
  REJECT = 'reject',
  ERR_STREAM_SUPPORT = 'ERR_STREAM_SUPPORT',
  ERR_WEBRTC_SUPPORT = 'ERR_WEBRTC_SUPPORT',
}

@Injectable()
export class PeerService extends EventEmitter {

  public peer: any;

  constructor(private socketService: SocketService) {
    super();
    setTimeout(() => {
      this.peer = new Peer(socketService.socket);
      this.emit('LOADED');
    }, 1000);
  }

}
