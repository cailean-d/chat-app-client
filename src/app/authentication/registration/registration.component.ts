import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ru/) ? translate.getBrowserLang() : 'en');
  }

  ngOnInit() {}

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
