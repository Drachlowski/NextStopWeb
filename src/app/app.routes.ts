import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'admin/holidays',
    loadChildren: () =>
      import('./admin/holiday-management/holiday-management.routes').then(
        (m) => m.HOLIDAY_MANAGEMENT_ROUTES
      ),
  },
  {
    path: 'admin/stops',
    loadChildren: () =>
      import('./admin/stop-management/stop-management.routes').then(
        (m) => m.STOP_MANAGEMENT_ROUTES
      ),
  },
  { path: '', redirectTo: 'admin/holidays', pathMatch: 'full' },
  { path: '**', redirectTo: 'admin/holidays' }
];
