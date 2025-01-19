import {provideNativeDateAdapter} from '@angular/material/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {routes} from './calendar.routes';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    provideNativeDateAdapter()
  ],
  exports: []
})
export class CalendarModule {}
