import { Component, OnInit } from '@angular/core';
import { OwnProfileService } from '../../__services/own-profile.service';
import { PeerService, PeerEvent } from '../../__services/peer.service';
import { ProfileService } from '../../__services/profile.service';

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.scss']
})
export class VideoCallComponent implements OnInit {

  showVideoCall = false;
  videoCall = false;
  videoReceive = false;
  videoIsRunning = false;
  remoteNickname = null;
  remoteID = null;
  remotePeer = [];
  remoteVideoSource = null;
  callingSound = null;
  cancelCallTimer = null;

  constructor(
    public profile: OwnProfileService,
    private peer: PeerService,
    private profileService: ProfileService
  ) { }

  ngOnInit() {

    this.peer.on('call', (data) => {
      this.call(data);
    });

    this.peer.on('LOADED', () => {

      if (!this.peer.peer.WEBRTC_SUPPORT) {
        alert('NO SUPPORT WEBRTC');
      }

      this.peer.peer.on(PeerEvent.CALL, (data, peer) => {
        console.log('call...', data);
        this.profileService.getUser(data).then((d) => {
          this.remoteID = d.id;
          this.remoteNickname = d.nickname;
          this.remotePeer.push(peer);
          this.showVideoCall = true;
          this.videoReceive = true;
        });
        if (this.callingSound) {
          this.callingSound.pause();
          this.callingSound = null;
        }
        clearTimeout(this.cancelCallTimer);

      });

      this.peer.peer.on(PeerEvent.CLOSE, (data) => {
        this.showVideoCall = false;
        this.videoCall = false;
        this.videoReceive = false;
        this.videoIsRunning = false;
        console.log('close...', data);
        if (this.callingSound) {
          this.callingSound.pause();
          this.callingSound = null;
        }
        clearTimeout(this.cancelCallTimer);
      });

      this.peer.peer.on(PeerEvent.REJECT, (data) => {
        this.showVideoCall = false;
        this.videoCall = false;
        this.peer.peer.destroyMedia();
        this.peer.peer.peer.destroy();
        console.log('reject...', data);
        if (this.callingSound) {
          this.callingSound.pause();
          this.callingSound = null;
        }
        clearTimeout(this.cancelCallTimer);
      });

      this.peer.peer.on(PeerEvent.STREAM, (data) => {
        this.videoReceive = false;
        this.videoCall = false;
        this.videoIsRunning = true;
        document.querySelector('.rCall').addEventListener('DOMNodeInserted', (event) => {
          const t = event.target as any;
          const v = t.querySelector('#remoteVideo') as HTMLVideoElement;
          v.srcObject = data;
        });

        console.log('stream...', data);
        console.log(this.videoCall, this.videoIsRunning);

        if (this.callingSound) {
          this.callingSound.pause();
          this.callingSound = null;
        }
        clearTimeout(this.cancelCallTimer);
      });
    });
  }

  call(remoteID): void {
    this.profileService.getUser(remoteID).then((d) => {
      this.remoteID = d.id;
      this.remoteNickname = d.nickname;
      this.showVideoCall = !this.showVideoCall;
      this.videoCall = true;
      this.peer.peer.call(true, this.profile.user.id, remoteID);
      this.callingSound = new Audio('./assets/sounds/calling.mp3');
      this.callingSound.play();
      this.callingSound.loop = true;
      this.cancelCallTimer = setTimeout(() => {
        this.callingSound.pause();
        this.callingSound = null;
        this.calcelCalling();
      }, 30000);
    });
  }

  calcelCalling(): void {
    this.showVideoCall = false;
    this.videoCall = false;
    this.videoReceive = false;
    this.videoIsRunning = false;
    this.peer.peer.close(this.profile.user.id, this.remoteID);
    if (this.callingSound) {
      this.callingSound.pause();
      this.callingSound = null;
    }
    clearTimeout(this.cancelCallTimer);
  }

  acceptCall(): void {
    console.log(this.remotePeer);
    for (const i of this.remotePeer) {
      this.peer.peer.answer(true, this.profile.user.id, this.remoteID, i);
    }
    this.remotePeer = [];
    if (this.callingSound) {
      this.callingSound.pause();
      this.callingSound = null;
    }
    clearTimeout(this.cancelCallTimer);
  }

  rejectCall(): void {
    this.videoReceive = false;
    this.showVideoCall = false;
    this.peer.peer.reject(this.profile.user.id, this.remoteID);
    if (this.callingSound) {
      this.callingSound.pause();
      this.callingSound = null;
    }
    clearTimeout(this.cancelCallTimer);
  }

}
