import { PeerService } from '../../__services/peer.service';
import { SocketService } from '../../__services/socket.service';
import { OwnProfileService } from '../../__services/own-profile.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '../../__services/notification.service';
import { VideoCallComponent } from '../../peer/video-call/video-call.component';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  @ViewChild(VideoCallComponent) videoCall: VideoCallComponent;

  dataIsLoaded: boolean;
  qq: boolean;

  constructor(
    private profile: OwnProfileService,
    private socket: SocketService,
    private notification: NotificationService,
    private peer: PeerService
  ) {
    this.socket.connect().then(() => {
      this.notification.load();
    });
  }

  ngOnInit() {
    this.getProfile();
  }

  private async getProfile(): Promise<void> {
    if (this.profile.dataIsLoaded) {
      setTimeout(() => this.dataIsLoaded = true, 0);
    } else {
      await this.profile.getData();
      setTimeout(() => this.dataIsLoaded = true, 0);
    }
  }

}
