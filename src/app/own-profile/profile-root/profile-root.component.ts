import { OwnProfileService } from '../../__services/own-profile.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-root',
  templateUrl: './profile-root.component.html',
  styleUrls: ['./profile-root.component.scss']
})
export class ProfileRootComponent implements OnInit {

  isEdit: boolean;

  form: FormGroup;
  temp: any;

  constructor(
    protected profile: OwnProfileService,
    private title: Title,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.title.setTitle(this.profile.user.nickname);
    this.initForm();
  }

  initForm(): void  {
    this.form = this.fb.group({
    gender: [null,
      [
        Validators.pattern(/^(male|female)$/)
      ]
    ],
    birthday: [null,
      [
        Validators.pattern(/^\d{2}(\.|\/)\d{2}(\.|\/)\d{4}$/)
      ]
    ],
    language: [null,
      [
        Validators.pattern(/^[a-zA-Zа-яА-ЯёЁ\s\,]{4,50}$/)
      ]
    ],
    address: [null,
      [
        Validators.pattern(/^[a-zA-Zа-яА-ЯёЁ\s\,\.\:\-\d]{4,50}$/)
      ]
    ],
    phone: [null,
      [
        Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
      ]
    ],
    website: [null,
      [
        Validators.pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)
      ]
    ],
    country: [null,
      [
        Validators.pattern(/^[a-zA-Zа-яА-ЯёЁ\s-]{3,40}$/)
      ]
    ],
    city: [null,
      [
        Validators.pattern(/^[a-zA-Zа-яА-ЯёЁ\s-]{3,40}$/)
      ]
    ],
    });
  }

  editProfile(): void {
    this.temp = JSON.parse(JSON.stringify(this.profile.user));
    this.isEdit = true;
  }

  cancelEdit(): void {
    this.profile.user = this.temp;
    this.isEdit = false;
  }

  save(): void {
    this.profile.update().then(() => {
      this.isEdit = false;
    });
  }

}
