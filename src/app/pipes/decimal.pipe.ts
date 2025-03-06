import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimal',
})
export class DecimalPipe implements PipeTransform {
  transform(value: number | string, decimalPlaces: number = 2): string {
    if (value == null || isNaN(Number(value))) {
      return '';
    }

    let num = Number(value).toFixed(decimalPlaces);

    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
}
