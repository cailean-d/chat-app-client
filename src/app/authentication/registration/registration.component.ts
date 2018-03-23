import { I18nService } from '../../_root/service/i18n.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  isDataLoaded: boolean;

  constructor(private i18n: I18nService) { }

  async ngOnInit() {
    await this.i18n.useLanguage();
    this.isDataLoaded = true;
  }

  onFocusField(element: HTMLDivElement): void {
    element.classList.add('focus');
  }

  onBlurField(element: HTMLDivElement): void {
    element.classList.remove('focus');
  }

  reg(event: MouseEvent) {
    event.preventDefault();
  }

}
