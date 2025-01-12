import { Routes } from '@angular/router';
import { TimetableSearchComponent } from './timetable-search/timetable-search.component';
import { TimetableResultComponent } from './timetable-result/timetable-result.component';

export const TIMETABLE_ROUTES: Routes = [
  { path: '', component: TimetableSearchComponent },
  { path: 'results', component: TimetableResultComponent }
];
