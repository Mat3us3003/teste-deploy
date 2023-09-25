import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpf'
})
export class CpfPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if(value == undefined || value == null) {
      return value;
    }
    let cpf = value.replace(/(\d{3})?(\d{3})?(\d{3})?(\d{2})/, '$1.$2.$3-$4');

    return cpf;
  }

}
