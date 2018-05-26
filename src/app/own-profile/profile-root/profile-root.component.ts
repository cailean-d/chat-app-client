import { OwnProfileService } from '../../__services/own-profile.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-root',
  templateUrl: './profile-root.component.html',
  styleUrls: ['./profile-root.component.scss']
})
export class ProfileRootComponent implements OnInit {

  @ViewChild('avatar') avatar: ElementRef;

  isEdit: boolean;

  form: FormGroup;
  temp: any;
  file: File;
  temp_avatar: string;
  avatar_edit: boolean;

  constructor(
    protected profile: OwnProfileService,
    private title: Title,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.title.setTitle(this.profile.user.nickname);
    this.temp_avatar = this.profile.user.avatar;
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

  loadAvatar(event: Event): void {

    const fintInput = event.target as HTMLInputElement;

    if (fintInput.files[0]) {
      this.file = fintInput.files[0];
      this.loadPreview(this.file, this.avatar.nativeElement);
    }
  }

  loadPreview(file: File, el: HTMLImageElement) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    this.avatar_edit = true;
    reader.onload = (e: Event) => {
        el.src = (e.target as any).result;
    };
  }

  cancelAvatar(): void {
    this.avatar.nativeElement.src = this.temp_avatar;
    this.avatar_edit = false;
  }

  saveAvatar(): void {
    this.profile.updateAvatar(this.file).then(() => {
      this.temp_avatar = this.profile.user.avatar;
      this.avatar_edit = false;
    });
  }

}
