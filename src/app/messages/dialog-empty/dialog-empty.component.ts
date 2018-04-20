import { Component, OnInit } from '@angular/core';
import { I18nService } from '../../_root/service/i18n.service';

@Component({
  selector: 'app-dialog-empty',
  templateUrl: './dialog-empty.component.html',
  styleUrls: ['./dialog-empty.component.scss']
})
export class DialogEmptyComponent implements OnInit {

  constructor(private i18n: I18nService) { }

  ngOnInit() {
  }

}
