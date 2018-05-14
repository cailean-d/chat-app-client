import { Component, OnInit } from '@angular/core';
import { I18nService } from '../../__services/i18n.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private i18n: I18nService,
  ) { }

  ngOnInit() {}

}
