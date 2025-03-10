import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimal',
})
export class DecimalPipe implements PipeTransform {
  transform(value: number | string, decimalPlaces: number = 2): string {
    if (value == null || isNaN(Number(value))) {
      return '';
    }

    return Number(value).toLocaleString('pl-PL', {
      maximumFractionDigits: decimalPlaces,
    });
  }
}
