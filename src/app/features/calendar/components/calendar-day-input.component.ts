import {MatButton, MatIconButton} from '@angular/material/button';
import {Component, model} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {addDaysToDate} from '../../../shared/utils/date.utils';

@Component({
  selector: 'app-calendar-day-input',
  imports: [
    MatIconModule,
    MatIconButton,
    DateFormatPipe
  ],
  template: `
    <div class="container">
      <button mat-icon-button type="button" (click)="onPrevDay()" ><mat-icon>chevron_left</mat-icon></button>
      <span class="date">{{ selectedDate() | dateFormat }}</span>
      <button mat-icon-button type="button" (click)="onNextDay()" ><mat-icon>chevron_right</mat-icon></button>
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
export class CalendarDayInputComponent {
  selectedDate = model.required<Date>();

  onPrevDay = () => {
    this.selectedDate.set(addDaysToDate(this.selectedDate(), -1))
  }
  onNextDay = () => {
    this.selectedDate.set(addDaysToDate(this.selectedDate(), 1))
  }
}
