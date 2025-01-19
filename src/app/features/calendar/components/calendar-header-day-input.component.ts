import {MatButton, MatIconButton} from '@angular/material/button';
import {Component, model} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-calendar-header-day-input',
  imports: [
    MatIconModule,
    MatIconButton
  ],
  template: `
    <div class="container">
      <button mat-icon-button><mat-icon>chevron_left</mat-icon></button>
      <time class="date" [attr.datetime]="selected()">Date</time>
      <button mat-icon-button><mat-icon>chevron_right</mat-icon></button>
    </div>
  `,
  styles: `
    .container{
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }
    .date{
      font-size: 1rem;
    }
  `
})
export class CalendarHeaderDayInputComponent {
  selected = model<Date | null>(null);
}
