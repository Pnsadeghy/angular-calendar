import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {

  transform(value: Date | string | null | undefined): string {
    if (!value) {
      return '';
    }

    const dateObj = new Date(value);
    if (isNaN(dateObj.getTime())) {
      return '';
    }

    return dateObj.toLocaleDateString('en-US', {
      month: 'long',
      day: '2-digit',
      year: 'numeric'
    });
  }
}
