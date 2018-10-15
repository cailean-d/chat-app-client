import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDefaultAvatar]'
})
export class DefaultAvatarDirective {

  constructor(private el: ElementRef) { }

  @HostListener('error') onError() {
    this.changeImage();
  }

  private changeImage() {
    this.el.nativeElement.src = '/assets/images/no-image.jpg';
  }

}
