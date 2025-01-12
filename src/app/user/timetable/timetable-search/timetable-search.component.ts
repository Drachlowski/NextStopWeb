import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { StopService } from '../../../shared/services/stop.service';
import { TripService } from '../../../shared/services/trip.service';
import { Stop } from '../../../shared/models/stop.model';

@Component({
  selector: 'app-timetable-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [StopService, TripService],
  templateUrl: './timetable-search.component.html'
})
export class TimetableSearchComponent {
  stops: Stop[] = [];
  startStopId?: number;
  endStopId?: number;
  departureTime?: string;

  constructor(
    private stopService: StopService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.stopService.getAll().subscribe((res) => {
      this.stops = res || [];
    });
  }

  searchTimetable(): void {
    if (!this.startStopId || !this.endStopId) return;

    this.router.navigate(['/user/timetable/results'], {
      queryParams: {
        startStopId: this.startStopId,
        endStopId: this.endStopId,
        departureTime: this.departureTime || ''
      }
    });
  }
}
