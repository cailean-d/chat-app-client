import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appStopBubbling]'
})
export class StopBubblingDirective {

  @HostListener('click', ['$event'])
  public onClick(event: any): void {
      event.stopPropagation();
  }

}

