import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if(!value) {
      return value;
    }
    let phone = value.replace(/(\d{2})?(\d{5})?(\d{4})/, '($1) $2-$3');

    return phone;
  }

}
