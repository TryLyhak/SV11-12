import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toKHR',
})
export class toKHRPipe implements PipeTransform {
  transform(amount: number): unknown {
    if (!amount) return '៛0';

    let res: number = amount * 4100;
    let roundedKHR = Math.round(res / 100) * 100;
    let formatted = roundedKHR.toLocaleString() + ' ៛';

    return formatted;
  }
}
