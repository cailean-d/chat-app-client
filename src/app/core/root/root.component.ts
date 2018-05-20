import { SocketService } from '../../__services/socket.service';
import { OwnProfileService } from '../../__services/own-profile.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  dataIsLoaded: boolean;

  constructor(private profile: OwnProfileService, private socket: SocketService) {
    this.socket.connect();
  }

  ngOnInit() {
    this.getProfile();
  }

  private async getProfile(): Promise<void> {
    if (this.profile.dataIsLoaded) {
      this.dataIsLoaded = true;
    } else {
      await this.profile.getData();
      this.dataIsLoaded = true;
    }
  }

}
