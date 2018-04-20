import { I18nService } from '../../_root/service/i18n.service';
import { Component, OnInit } from '@angular/core';

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
