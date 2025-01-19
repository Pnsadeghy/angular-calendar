import {MatCalendar} from '@angular/material/datepicker';
import {Component, model} from '@angular/core';

@Component({
  selector: 'app-calendar-sidebar',
  imports: [
    MatCalendar
  ],
  template: `
    <div class="container" >
      <mat-calendar [(selected)]="selectedDate"></mat-calendar>
    </div>
  `,
  styles: `
    .container{
      padding: 0.5rem;
    }
  `
})
export class CalendarSidebarComponent {
  selectedDate = model<Date | null>(null);
}
