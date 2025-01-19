import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./calendar.component').then(c => c.CalendarComponent)
  }
];
