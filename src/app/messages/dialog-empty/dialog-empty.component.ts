import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LangChangeEvent } from '@ngx-translate/core';
import { I18nService } from '../../__services/i18n.service';

@Component({
  selector: 'app-dialog-empty',
  templateUrl: './dialog-empty.component.html',
  styleUrls: ['./dialog-empty.component.scss']
})
export class DialogEmptyComponent implements OnInit {

  constructor(
    private i18n: I18nService,
    private title: Title
  ) { }

  ngOnInit() {
    this.setTitle();
    this.updateTitleOnLangChange();
  }

  private setTitle(): void {
    this.i18n.translate.get('hint.chats').subscribe((res: string) => {
      this.title.setTitle(res);
    });

  }

  private updateTitleOnLangChange(): void {
    this.i18n.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setTitle();
    });
  }


}
