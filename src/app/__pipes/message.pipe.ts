import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'message'
})
export class MessagePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(value: string, args?: any): any {
    value = this.parseAudioMessage(value);
    value = this.parseImage(value);
    value = this.parseLink(value);
    value = this.addBreaksToMessage(value);
    value = <string>this.sanitizer.bypassSecurityTrustHtml(value);
    return value;
  }

  private addBreaksToMessage(text: string): string {
    return text.replace(/\r?\n/g, '<br />');
  }

  private parseImage(text: string): string {
    const imageRegExp = new RegExp(''
      + '^https?:\\/\\/[\\w.\\/\\-=%_?&$]*'
      + '(jpg|png|jpeg|gif)[\\w.\\/\\-=%_?&$]*$'
    );
    let res: any;
    if (res = text.match(imageRegExp)) {
      return text.replace(imageRegExp, `<img src="${res[0]}" alt="" style="max-width: 400px;
      width: 100%; display: block;border-radius: 4px; margin: 10px 0;" draggable="false">`);
    } else {
      return text;
    }
  }

  private parseLink(text: string): string {
    const linkRegExp = new RegExp(''
      + '(https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}'
      + '\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*))|((www\\.)?'
      + '[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.'
      + '(com|ru|info|biz|edu|gov|info|net|org)'
      + '\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*))',
    'g');
    return text.replace(linkRegExp, (str) => {
      const x: number = text.indexOf(str);
      if (text[x - 1] !== '"') {
        if (str.match(/^http/)) {

          return `<a href="${str}" target="_blank">${str}</a>`;
        } else {
          return `<a href="http://${str}" target="_blank">${str}</a>`;
        }
      } else {
        return str;
      }
    });
  }

  private parseAudioMessage(text: string): string {
    const match = /^\[audio_message\]\s(.*)/.exec(text);
    if (match) {
      return `<audio controls src="${match[1]}" style="margin-top:5px"></audio>`;
    } else {
      return text;
    }
  }

}
