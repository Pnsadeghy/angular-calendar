import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar-header',
  standalone: true,
  template: `
    <div class="container" >
      <h1>Calendar application</h1>

      <div>
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: `
    .container{
      padding: 0 0.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `
})
export class CalendarHeaderComponent {}
