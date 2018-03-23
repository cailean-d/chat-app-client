import { I18nService } from '../../_root/service/i18n.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restore-root',
  templateUrl: './restore-root.component.html',
  styleUrls: ['./restore-root.component.scss']
})
export class RestoreRootComponent implements OnInit {

  isDataLoaded: boolean;

  constructor(private i18n: I18nService) { }

  async ngOnInit() {
    await this.i18n.useLanguage();
    this.isDataLoaded = true;
  }

  restore(event: Event) {
    event.preventDefault();
  }

  onFocusField(element: HTMLDivElement): void {
    element.classList.add('focus');
  }

  onBlurField(element: HTMLDivElement): void {
    element.classList.remove('focus');
  }

}
