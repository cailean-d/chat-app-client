import { LangChangeEvent } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { I18nService } from '../../__services/i18n.service';

@Component({
  selector: 'app-settings-root',
  templateUrl: './settings-root.component.html',
  styleUrls: ['./settings-root.component.scss']
})
export class SettingsRootComponent implements OnInit {

  constructor(
    private i18n: I18nService,
    private title: Title
  ) { }

  ngOnInit() {
    this.setTitle();
    this.updateTitleOnLangChange();
  }

  private setTitle(): void {
    this.i18n.translate.get('hint.settings').subscribe((res: string) => {
      this.title.setTitle(res);
    });
  }

  private updateTitleOnLangChange(): void {
    this.i18n.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setTitle();
    });
  }


}
