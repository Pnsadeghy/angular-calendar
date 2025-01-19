import {Appointment} from '../models/appointment.model';
import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {isDateEqual} from '../../../shared/utils/date.utils';
import {generateUUID} from '../../../shared/utils/string.utils';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private readonly STORAGE_KEY = 'appointments';

  private appointmentsSubject = new BehaviorSubject<Appointment[]>([]);

  list(): Observable<Appointment[]> {
    return this.appointmentsSubject.asObservable();
  }

  getAppointmentsByDate(date: Date): Observable<Appointment[]> {
    return this.appointmentsSubject.asObservable().pipe(
      map((appointments) =>
        appointments.filter((a) => isDateEqual(a.date, date))
      )
    );
  }

  add(appointment: Appointment) {
    const currentAppointments = this.appointmentsSubject.value;
    const newAppointment: Appointment = {
      ...appointment,
      id: generateUUID()
    };
    this.appointmentsSubject.next([...currentAppointments, newAppointment]);
  }

  delete(id: string) {
    const currentAppointments = this.appointmentsSubject.value;
    const updatedAppointments = currentAppointments.filter(
      (a) => a.id !== id
    );
    this.appointmentsSubject.next(updatedAppointments);
  }

  update(updatedAppointment: Appointment) {
    const currentAppointments = [...this.appointmentsSubject.value];
    const index = currentAppointments.findIndex(
      (a) => a.id === updatedAppointment.id
    );
    if (index !== -1) {
      console.log(updatedAppointment, {...currentAppointments[index]});
      currentAppointments[index] = { ...updatedAppointment };
      this.appointmentsSubject.next([...currentAppointments]);
    }
  }
}
