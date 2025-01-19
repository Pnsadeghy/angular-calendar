import {Component, input, output} from '@angular/core';
import {Appointment} from '../models/appointment.model';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-calendar-appointment-item',
  template: `
    <button mat-flat-button type="button" (click)="onClick($event)">
      {{ appointment().title }}
    </button>
  `,
  imports: [
    MatButton
  ],
  styles: `
    button{
      width: 100%;
      justify-content: start;
      font-size: 0.8rem;
      height: auto;
      padding: 0.2rem 1rem;
      text-align: start;
    }
  `
})
export class CalendarAppointmentItemComponent {
  appointment = input.required<Appointment>()

  edit = output()

  onClick(event: Event) {
    event.stopPropagation()
    this.edit.emit()
  }
}
