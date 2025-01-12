import { Routes } from '@angular/router';
import { StopListComponent } from './stop-list/stop-list.component';
import { StopFormComponent } from './stop-form/stop-form.component';

export const STOP_MANAGEMENT_ROUTES: Routes = [
  { path: '', component: StopListComponent },
  { path: 'new', component: StopFormComponent },
  { path: ':id', component: StopFormComponent }
];
