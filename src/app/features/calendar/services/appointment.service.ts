import {Appointment} from '../interfaces/appointment.model';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {isDateEqual} from '../../../shared/utils/date.utils';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private readonly STORAGE_KEY = 'appointments';

  private _appointmentsSubject = new BehaviorSubject<Appointment[]>([]);
  appointments$ = this._appointmentsSubject.asObservable();

  constructor() {
    this.loadFromStorage();
  }

  get currentAppointments(): Appointment[] {
    return this._appointmentsSubject.value;
  }

  add(appointment: Appointment) {
    if (!appointment.id) {
      appointment.id = Date.now();
    }

    const updated = [...this.currentAppointments, appointment];
    this._appointmentsSubject.next(updated);
    this.saveToStorage(updated);
  }

  update(updatedAppointment: Appointment) {
    const appointments = [...this.currentAppointments];
    const index = appointments.findIndex(a => a.id === updatedAppointment.id);

    if (index === -1) {
      console.warn(`Appointment with id ${updatedAppointment.id} not found!`);
      return;
    }

    appointments[index] = updatedAppointment;

    this._appointmentsSubject.next(appointments);
    this.saveToStorage(appointments);
  }

  remove(appointmentId: number) {
    const updated = this.currentAppointments.filter(a => a.id !== appointmentId);
    this._appointmentsSubject.next(updated);
    this.saveToStorage(updated);
  }

  getAll(): Appointment[] {
    return this.currentAppointments;
  }

  getByDate(date: Date): Appointment[] {
    return this.currentAppointments.filter(a => isDateEqual(a.date, date));
  }

  private saveToStorage(appointments: Appointment[]) {
    const serialized = JSON.stringify(appointments);
    localStorage.setItem(this.STORAGE_KEY, serialized);
  }

  private loadFromStorage() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      try {
        const arr = JSON.parse(data) as Appointment[];
        arr.forEach(item => {
          item.date = new Date(item.date);
        });
        this._appointmentsSubject.next(arr);
      } catch (err) {
        console.warn('Error parsing appointments from localStorage', err);
      }
    }
  }
}
