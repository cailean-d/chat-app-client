import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'messageList'
})
export class MessageListPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    value = this.parseImage(value);
    value = this.parseLink(value);
    value = this.parseAudioMessage(value);
    value = this.parseVideoMessage(value);
    value = this.parseFileMessage(value);
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

  private parseAudioMessage(text: string): string {
    const match = /^\[audio_message\]\s(.*)/.exec(text);
    if (match) {
      return `Голосовое сообщение`;
    } else {
      return text;
    }
  }

  private parseFileMessage(text: string): string {
    const match = /^\[file\]\s(.*)\s(.*)/.exec(text);
    if (match) {
      return `Файл`;
    } else {
      return text;
    }
  }

  private parseVideoMessage(text: string): string {
    const match = /^\[video_message\]\s(.*)/.exec(text);
    if (match) {
      return `Видеосообщение`;
    } else {
      return text;
    }
  }

}
