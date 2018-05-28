import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-popup-message',
  templateUrl: './popup-message.component.html',
  styleUrls: ['./popup-message.component.scss']
})
export class PopupMessageComponent implements OnInit {

  @ViewChild('popup') private popup: ElementRef;

  public message = '';
  private fadeTime = 3;
  private hideTime = 5;

  constructor() { }

  ngOnInit() {
    this.holdOnMouseover();
    this.hideOnMouseleave();
  }

  showPopup(message: string): void {
    this.message = message;
    const notif = this.popup.nativeElement as HTMLElement;
    notif.classList.add('show');
    notif.addEventListener('transitionend', () => {
      if (notif.classList.contains('show')) {
        setTimeout(() => {
          if (!notif.classList.contains('hold')) {
            notif.classList.remove('show');
          }
        }, this.fadeTime * 1000);
      }
    });
  }

  public closePopup(): void {
    const notif = this.popup.nativeElement as HTMLElement;
    notif.classList.remove('show');
    notif.classList.remove('hold');
    notif.addEventListener('transitionend', () => {
      if (!notif.classList.contains('show')) {
        this.message = null;
      }
    });
  }

  private holdOnMouseover(): void {
    const notif = this.popup.nativeElement as HTMLElement;
    notif.onmouseover = () => {
      notif.classList.add('hold');
    };
  }

  private hideOnMouseleave(): void {
    const notif = this.popup.nativeElement as HTMLElement;
    notif.onmouseleave = () => {
      notif.classList.remove('hold');
      setTimeout(() => {
        if (!notif.classList.contains('hold')) {
          this.closePopup();
        }
      }, this.hideTime * 1000);
    };
  }

}
