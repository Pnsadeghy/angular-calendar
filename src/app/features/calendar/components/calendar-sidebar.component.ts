import {MatCalendar} from '@angular/material/datepicker';
import {Component, model, output} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-calendar-sidebar',
  imports: [
    MatCalendar,
    MatButton,
    MatIconModule
  ],
  template: `
    <div class="container" >
      <button mat-stroked-button type="button" (click)="addCalendar.emit()">
        <mat-icon>add</mat-icon>
        Add Calendar
      </button>
      <mat-calendar [(selected)]="selectedDate"></mat-calendar>
    </div>
  `,
  styles: `
    .container{
      padding: 0.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  `
})
export class CalendarSidebarComponent {
  selectedDate = model<Date | null>(null);
  addCalendar = output()
}
