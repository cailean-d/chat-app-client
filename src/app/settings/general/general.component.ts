import { Component, OnInit } from '@angular/core';
import { I18nService } from '../../__services/i18n.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  constructor(private i18n: I18nService) { }

  ngOnInit() {
  }

  async changeLang(event: Event): Promise<void> {
    if ((event.target as HTMLSelectElement).value === 'en') {
      await this.i18n.switchLanguage('en');
    } else if ((event.target as HTMLSelectElement).value === 'ru') {
      await this.i18n.switchLanguage('ru');
    }
  }

}
