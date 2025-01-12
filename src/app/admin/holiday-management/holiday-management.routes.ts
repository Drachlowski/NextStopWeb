import { Routes } from '@angular/router';
import { HolidayListComponent } from './holiday-list/holiday-list.component';
import { HolidayFormComponent } from './holiday-form/holiday-form.component';

export const HOLIDAY_MANAGEMENT_ROUTES: Routes = [
  { path: '', component: HolidayListComponent },
  { path: 'new', component: HolidayFormComponent },
  { path: ':id', component: HolidayFormComponent }
];
