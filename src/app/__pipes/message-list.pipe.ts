import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'messageList'
})
export class MessageListPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    value = this.parseImage(value);
    value = this.parseLink(value);
    return value;
  }

  private parseImage(text: string): string {
    const imageRegExp = new RegExp(''
      + '^https?:\\/\\/[\\w.\\/\\-=%_?&$]*'
      + '(jpg|png|jpeg|gif)[\\w.\\/\\-=%_?&$]*$'
    );
    let res: any;
    if (res = text.match(imageRegExp)) {
      return 'Изображение';
    } else {
      return text;
    }
  }

  private parseLink(text: string): string {
    const linkRegExp = new RegExp(''
      + '^(https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}'
      + '\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*))|((www\\.)?'
      + '[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.'
      + '(com|ru|info|biz|edu|gov|info|net|org)'
      + '\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*))$',
    'g');
    let res: any;
    if (res = text.match(linkRegExp)) {
      return 'Ссылка';
    } else {
      return text;
    }
  }

}
