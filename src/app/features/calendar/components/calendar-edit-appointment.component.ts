import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Component, computed, inject, Inject, input} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {DateInputComponent} from '../../../shared/components/date-input.component';
import {AppointmentService} from '../services/appointment.service';
import {Appointment} from '../models/appointment.model';
import {TimeInputComponent} from '../../../shared/components/time-input.component';

@Component({
  selector: 'app-calendar-edit-appointment',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    DateInputComponent,
    TimeInputComponent
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <h2 mat-dialog-title>Edit Calendar appointment</h2>
      <mat-dialog-content>
        <div class="date-inputs" >
          <app-date-input [control]="form.controls['date']" label="Date" />
          <app-time-input [control]="form.controls['date']" label="time" />
        </div>

        <mat-form-field appearance="fill">
          <mat-label>Title</mat-label>
          <input matInput formControlName="title">
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Description</mat-label>
          <textarea matInput formControlName="description"></textarea>
        </mat-form-field>
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-raised-button [disabled]="form.invalid" >Save changes</button>
        <button mat-stroked-button type="button" (click)="onDelete()">Delete</button>
        <button mat-button mat-dialog-close type="button">Cancel</button>
      </mat-dialog-actions>
    </form>
  `,
  styles: `
    mat-dialog-content {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .date-inputs{
      display: flex;
      gap: 0.5rem;
    }
    app-date-input, app-time-input{
      flex: 1 1 auto;
    }
  `
})
export class CalendarEditAppointmentComponent {
  readonly dialogRef = inject(MatDialogRef<CalendarEditAppointmentComponent>);
  readonly data = inject<{appointment: Appointment}>(MAT_DIALOG_DATA);
  appointmentService = inject(AppointmentService);

  form = new FormGroup({
    date: new FormControl(this.data.appointment.date, [Validators.required]),
    title: new FormControl(this.data.appointment.title, [Validators.required]),
    description: new FormControl(this.data.appointment.description)
  })

  constructor() {}

  onSubmit() {
    const { date, title, description } = this.form.value;

    const updatedAppointment = {
      id: this.data.appointment.id,
      date,
      title,
      description
    };

    this.appointmentService.update(updatedAppointment as Appointment);

    this.dialogRef.close();
  }

  onDelete() {
    this.appointmentService.delete(this.data.appointment.id);

    this.dialogRef.close();
  }
}
