import {Component, input} from '@angular/core';

@Component({
  selector: 'app-calendar-content',
  standalone: true,
  imports: [],
  template: `
    <p>
      calendar-content works!
    </p>
  `,
  styles: ``
})
export class CalendarContentComponent {
  selectedDate = input.required<Date>()
}
