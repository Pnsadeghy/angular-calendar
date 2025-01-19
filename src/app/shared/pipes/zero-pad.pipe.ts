import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zeroPad',
  standalone: true
})
export class ZeroPadPipe implements PipeTransform {
  transform(value: number, length: number = 2): string {
    let strVal = String(value);
    while (strVal.length < length) {
      strVal = '0' + strVal;
    }
    return strVal;
  }
}
