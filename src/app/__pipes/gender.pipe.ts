import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === 'male') {
      return 'Мужской';
    } else if (value === 'female') {
      return 'Женский';
    } else {
      return null;
    }
  }

}
