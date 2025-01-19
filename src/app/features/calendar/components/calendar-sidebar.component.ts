import {MatCalendar} from '@angular/material/datepicker';
import {Component, model} from '@angular/core';

@Component({
  selector: 'app-calendar-sidebar',
  imports: [
    MatCalendar
  ],
  template: `
    <div class="container" >
      <mat-calendar [(selected)]="selected"></mat-calendar>
    </div>
  `,
  styles: `
    .container{
      padding: 0.5rem;
    }
  `
})
export class CalendarSidebarComponent {
  selected = model<Date | null>(null);
}
