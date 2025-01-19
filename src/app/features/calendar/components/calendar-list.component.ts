import {CalendarAppointmentItemComponent} from './calendar-appointment-item.component';
import {AppointmentService} from '../services/appointment.service';
import {Component, effect, inject, input, output} from '@angular/core';
import {Appointment} from '../models/appointment.model';
import {toObservable} from '@angular/core/rxjs-interop';
import {CdkDragDrop, DragDropModule} from '@angular/cdk/drag-drop';
import {AsyncPipe} from '@angular/common';
import {map, switchMap} from 'rxjs';
import {changeDateHour} from '../../../shared/utils/date.utils';
import {ZeroPadPipe} from '../../../shared/pipes/zero-pad.pipe';

interface HourBucket {
  hour: number;
  appointments: Appointment[];
}

@Component({
  selector: 'app-calendar-list',
  imports: [
    AsyncPipe,
    DragDropModule,
    CalendarAppointmentItemComponent,
    ZeroPadPipe
  ],
  template: `
    @for(bucket of $any(hours$|async); track bucket.hour) {
      <div class="item-container" (click)="addCalendar.emit(bucket.hour)">
        <span class="hour" >{{ bucket.hour | zeroPad }}:00</span>

        <div
          cdkDropList
          [id]="dropListIds[bucket.hour]"
          [cdkDropListConnectedTo]="dropListIds"
          [cdkDropListData]="bucket.appointments"
          class="calendar-list"
          (cdkDropListDropped)="onDrop($event, bucket.hour)"
          >
          @for(item of bucket.appointments; track item.id) {
            <app-calendar-appointment-item cdkDrag [appointment]="item" (edit)="editItem.emit(item)" />
          }
        </div>
      </div>
    }
  `,
  styles: `
    .item-container{
      border-bottom: solid thin #ccc;
      position: relative;
      display: flex;
      padding: 0.1rem;
      gap: 0.5rem;
      transition: background 0.2s;
      &:hover{
        background: #eee;
      }
    }

    .hour {
      font-size: 0.9rem;
      color: dimgray;
      display: block;
      cursor: pointer;
    }

    .calendar-list{
      flex: 1 1 auto;
      min-height: 5rem;
      display: flex;
      flex-direction: column;
      gap: 0.1rem;
      cursor: pointer;
    }

    app-calendar-appointment-item{
      display: block;
      z-index: 2;
    }
  `
})
export class CalendarListComponent {
  selectedDate = input.required<Date>();
  addCalendar = output<number>()
  editItem = output<Appointment>()

  appointmentService = inject(AppointmentService);

  dropListIds = Array.from({ length: 24 }, (_, i) => `dropList${i}`);

  hours$ = toObservable(this.selectedDate).pipe(
    switchMap(date => this.appointmentService.getAppointmentsByDate(date)),
    map((appointments: Appointment[]) => {
      const result: HourBucket[] = [];
      for (let hour = 0; hour < 24; hour++) {
        result.push({
          hour,
          appointments: appointments.filter((a: Appointment) => a.date.getHours() === hour)
        });
      }
      return result;
    })
  )

  onDrop(event: CdkDragDrop<Appointment[]>, hour: number) {
    if (event.previousContainer === event.container) return
    const appointment = event.previousContainer.data[event.previousIndex];
    this.appointmentService.update({
      ...appointment,
      date: changeDateHour(appointment.date, hour)
    })
  }
}
