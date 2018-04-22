import { Title } from '@angular/platform-browser';
import { I18nService } from '../../_root/service/i18n.service';
import { Component, OnInit } from '@angular/core';
import { LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-restore-root',
  templateUrl: './restore-root.component.html',
  styleUrls: ['./restore-root.component.scss']
})
export class RestoreRootComponent implements OnInit {

  isDataLoaded: boolean;

  constructor(
    private i18n: I18nService,
    private title: Title
  ) { }

  async ngOnInit() {
    await this.i18n.useLanguage();
    this.isDataLoaded = true;
    this.setTitle();
    this.updateTitleOnLangChange();
  }

  restore(event: Event): void {
    event.preventDefault();
  }

  onFocusField(element: HTMLDivElement): void {
    element.classList.add('focus');
  }

  onBlurField(element: HTMLDivElement): void {
    element.classList.remove('focus');
  }

  setTitle(): void {
    this.i18n.translate.get('form.title.restore_access').subscribe((res: string) => {
      this.title.setTitle(res);
    });

  }

  updateTitleOnLangChange(): void {
    this.i18n.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setTitle();
    });
  }


}
