import { Routes } from '@angular/router';
import { RouteListComponent } from './route-list/route-list.component';
import { RouteFormComponent } from './route-form/route-form.component';

export const ROUTE_MANAGEMENT_ROUTES: Routes = [
  { path: '', component: RouteListComponent },
  { path: 'new', component: RouteFormComponent },
  { path: ':id', component: RouteFormComponent }
];
