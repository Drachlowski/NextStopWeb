import { Routes } from '@angular/router';
import { canNavigateToAdminGuard } from './core/guards/can-navigate-to-admin.guard';
import { LoginComponent } from './admin/login/login.component';

export const routes: Routes = [

  {
    path: 'admin/holidays',
    loadChildren: () =>
      import('./admin/holiday-management/holiday-management.routes').then(
        (m) => m.HOLIDAY_MANAGEMENT_ROUTES
      ),
      canActivate: [canNavigateToAdminGuard]
  },
  {
    path: 'admin/stops',
    loadChildren: () =>
      import('./admin/stop-management/stop-management.routes').then(
        (m) => m.STOP_MANAGEMENT_ROUTES
      ),
      canActivate: [canNavigateToAdminGuard]
  },
  {
    path: 'admin/routes',
    loadChildren: () =>
      import('./admin/route-management/route-management.routes').then(
        (m) => m.ROUTE_MANAGEMENT_ROUTES
      ),
      canActivate: [canNavigateToAdminGuard]
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
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user/display-boards',
    loadChildren: () => {
      return import('./user/display-boards/display-boards.routes').then(
        (m) => m.DISPLAY_BOARDS_ROUTES
      );
    }
  },
  { path: '', redirectTo: 'user/timetable', pathMatch: 'full' },
  { path: '**', redirectTo: 'user/timetable' }
];
