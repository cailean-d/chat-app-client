import { Component, OnInit } from '@angular/core';
import { I18nService } from '../../__services/i18n.service';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.scss']
})
export class PagenotfoundComponent implements OnInit {

  isDataLoaded: boolean;

  constructor(private i18n: I18nService) { }

  async ngOnInit() {
    await this.i18n.useLanguage();
    this.isDataLoaded = true;
  }

  goBack() {
    history.back();
  }

}
