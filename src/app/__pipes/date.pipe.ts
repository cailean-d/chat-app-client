import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mydate'
})
export class DatePipe implements PipeTransform {

  transform(value: any, args?: any): any {

    const date = new Date(value);
    const now = new Date();

    const h = (date.getHours() < 10 ? '0' : '') + date.getHours();
    const m = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

    if (date.getDate() === now.getDate()) {
      return 'Сегодня, ' + h + ':' + m;
    } else if (date.getDate() + 1 === now.getDate()) {
      return 'Вчера, ' + h + ':' + m;
    } else {
      const formatter = new Intl.DateTimeFormat('ru');
      return formatter.format(date) + ', ' + h + ':' + m;
    }
  }

}
