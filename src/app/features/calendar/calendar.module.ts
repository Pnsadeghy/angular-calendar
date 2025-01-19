import {provideNativeDateAdapter} from '@angular/material/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {routes} from './calendar.routes';
import {NgModule} from '@angular/core';
import {AppointmentService} from './services/appointment.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    provideNativeDateAdapter()
  ]
})
export class CalendarModule {}
