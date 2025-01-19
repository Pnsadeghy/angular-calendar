import {CalendarDayInputComponent} from './components/calendar-day-input.component';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from '@angular/material/sidenav';
import {CalendarContentComponent} from './components/calendar-content.component';
import {CalendarSidebarComponent} from './components/calendar-sidebar.component';
import {CalendarHeaderComponent} from './components/calendar-header.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatToolbar} from '@angular/material/toolbar';
import {Component, signal} from '@angular/core';
import {CalendarNewAppointmentComponent} from './components/calendar-new-appointment.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CalendarHeaderComponent,
    MatDrawerContainer,
    MatDrawerContent,
    MatDrawer,
    CalendarSidebarComponent,
    CalendarContentComponent,
    MatToolbar,
    CalendarDayInputComponent,
    MatDialogModule
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
          <app-calendar-content [selectedDate]="selectedDate()" />
        </mat-drawer-content>
      </mat-drawer-container>
    </div>
  `,
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  selectedDate = signal<Date>(new Date());

  constructor(private dialog: MatDialog) {}

  onAddNewAppointment(date: Date = this.selectedDate()): void {
    this.dialog.open(CalendarNewAppointmentComponent, {
      data: {
        date
      },
      width: '600px'
    })
  }

  onAddNewAppointmentOnHour(hour: number): void {
    const date = new Date(this.selectedDate().getTime());
    date.setHours(hour);
    this.onAddNewAppointment(date)
  }
}
