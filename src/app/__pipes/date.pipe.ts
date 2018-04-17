import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: any, args?: any): any {

    const date = new Date(value);
    const now = new Date();

    if (date.getDate() === now.getDate()) {
      return 'Сегодня';
    } else if (date.getDate() + 1 === now.getDate()) {
      return 'Вчера';
    } else {
      const formatter = new Intl.DateTimeFormat('ru');
      return formatter.format(date);
    }
  }

}
