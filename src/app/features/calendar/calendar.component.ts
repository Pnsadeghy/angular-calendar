import {CalendarNewAppointmentComponent} from './components/calendar-new-appointment.component';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from '@angular/material/sidenav';
import {CalendarDayInputComponent} from './components/calendar-day-input.component';
import {CalendarSidebarComponent} from './components/calendar-sidebar.component';
import {CalendarHeaderComponent} from './components/calendar-header.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatToolbar} from '@angular/material/toolbar';
import {Component, signal} from '@angular/core';
import {CalendarListComponent} from './components/calendar-list.component';
import {changeDateHour} from '../../shared/utils/date.utils';
import {Appointment} from './models/appointment.model';
import {CalendarEditAppointmentComponent} from './components/calendar-edit-appointment.component';

@Component({
  selector: 'app-calendar',
  imports: [
    CalendarHeaderComponent,
    MatDrawerContainer,
    MatDrawerContent,
    MatDrawer,
    CalendarSidebarComponent,
    MatToolbar,
    CalendarDayInputComponent,
    MatDialogModule,
    CalendarListComponent,
    CalendarListComponent
  ],
  template: `
    <div class="calendar-container">
      <mat-toolbar>
        <app-calendar-header>
          <app-calendar-day-input [(selectedDate)]="selectedDate" />
        </app-calendar-header>
      </mat-toolbar>
      <mat-drawer-container>
        <mat-drawer mode="side" opened >
          <app-calendar-sidebar (addCalendar)="onAddNewAppointment()" [(selectedDate)]="selectedDate" />
        </mat-drawer>
        <mat-drawer-content>
          <app-calendar-list [selectedDate]="selectedDate()"
                             (editItem)="onEditAppointment($event)"
                             (addCalendar)="onAddNewAppointmentOnHour($event)" />
        </mat-drawer-content>
      </mat-drawer-container>
    </div>
  `,
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  selectedDate = signal<Date>(new Date());

  constructor(private dialog: MatDialog) {
    this.selectedDate().setMinutes(0);
    this.selectedDate().setSeconds(0);
  }

  onAddNewAppointment(date: Date = this.selectedDate()): void {
    this.dialog.open(CalendarNewAppointmentComponent, {
      data: {
        date
      },
      width: '600px'
    })
  }

  onEditAppointment(appointment: Appointment) {
    this.dialog.open(CalendarEditAppointmentComponent, {
      data: {
        appointment
      },
      width: '600px'
    })
  }

  onAddNewAppointmentOnHour(hour: number): void {
    this.onAddNewAppointment(changeDateHour(this.selectedDate(), hour));
  }
}
