import {Component, input} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTimepicker, MatTimepickerInput, MatTimepickerToggle} from '@angular/material/timepicker';

@Component({
  selector: 'app-time-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTimepickerToggle,
    MatTimepicker,
    MatTimepickerInput
  ],
  template: `
    <mat-form-field appearance="fill">
      <mat-label>{{ label() }}</mat-label>
      <input matInput
             [matTimepicker]="picker"
             [formControl]="control()"
             [placeholder]="placeholder()">
      <mat-timepicker-toggle matIconSuffix [for]="picker"/>
      <mat-timepicker #picker/>
    </mat-form-field>
  `,
  styles: ``
})
export class TimeInputComponent {
  control = input.required<FormControl>()
  label = input.required<string>()
  placeholder = input<string>('')
}
