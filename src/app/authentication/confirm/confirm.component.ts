import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { I18nService } from '../../__services/i18n.service';
import { LangChangeEvent } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  isDataLoaded: boolean;
  valid: boolean;

  constructor(
    private i18n: I18nService,
    private title: Title,
    private http: HttpClient,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.setTitle();
    this.updateTitleOnLangChange();
    this.activeRoute.params.subscribe((params) => {
      this.isDataLoaded = true;
      this.http.post(`auth/confirm/${params.id}`, {}).subscribe((response) => {
          this.valid = true;
      }, (err) => {
        this.valid = false;
      });
    });
  }

  async confirm(hash): Promise<void> {

  }

  setTitle(): void {
    this.i18n.translate.get('title.confirm').subscribe((res: string) => {
      this.title.setTitle(res);
    });

  }

  updateTitleOnLangChange(): void {
    this.i18n.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setTitle();
    });
  }

}
