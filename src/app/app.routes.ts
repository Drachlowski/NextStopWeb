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
  {
    path: 'admin/routes',
    loadChildren: () =>
      import('./admin/route-management/route-management.routes').then(
        (m) => m.ROUTE_MANAGEMENT_ROUTES
      ),
  },
  {
    path: 'user/stop-search',
    loadChildren: () =>
      import('./user/stop-search/stop-search.routes').then(
        (m) => m.STOP_SEARCH_ROUTES
      ),
  },
  {
    path: 'user/timetable',
    loadChildren: () =>
      import('./user/timetable/timetable.routes').then(
        (m) => m.TIMETABLE_ROUTES
      ),
  },
  {
    path: 'user/display-boards',
    loadChildren: () => {
      return import('./user/display-boards/display-boards.routes').then(
        (m) => m.DISPLAY_BOARDS_ROUTES
      );
    }
  },
  { path: '', redirectTo: 'admin/holidays', pathMatch: 'full' },
  { path: '**', redirectTo: 'admin/holidays' }
];
