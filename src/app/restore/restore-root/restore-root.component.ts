import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-restore-root',
  templateUrl: './restore-root.component.html',
  styleUrls: ['./restore-root.component.scss']
})
export class RestoreRootComponent implements OnInit {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ru/) ? translate.getBrowserLang() : 'en');
  }

  ngOnInit() {}

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
