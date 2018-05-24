import { I18nService } from '../../__services/i18n.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  dataIsLoaded: boolean;

  constructor(private i18n: I18nService) { }

  ngOnInit() {
    this.i18n.on('LANG_LOADED', () => {
      this.dataIsLoaded = true;
    });
  }
}
