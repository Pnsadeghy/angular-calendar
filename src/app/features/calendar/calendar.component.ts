import {CalendarDayInputComponent} from './components/calendar-day-input.component';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from '@angular/material/sidenav';
import {CalendarContentComponent} from './components/calendar-content.component';
import {CalendarSidebarComponent} from './components/calendar-sidebar.component';
import {CalendarHeaderComponent} from './components/calendar-header.component';
import {MatToolbar} from '@angular/material/toolbar';
import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-calendar',
  imports: [
    CalendarHeaderComponent,
    MatDrawerContainer,
    MatDrawerContent,
    MatDrawer,
    CalendarSidebarComponent,
    CalendarContentComponent,
    MatToolbar,
    CalendarDayInputComponent
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
          <app-calendar-sidebar [(selectedDate)]="selectedDate" />
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
}
