import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { TripService } from '../../../shared/services/trip.service';
import { TimetableRequest } from '../../../shared/models/timetablerequest.model';
import { TimetableResponse } from '../../../shared/models/timetableresponse.model';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-timetable-result',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatTableModule
  ],
  providers: [TripService],
  templateUrl: './timetable-result.component.html'
})
export class TimetableResultComponent {
  results: TimetableResponse[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(
    private tripService: TripService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const request: TimetableRequest = {
        startStopId: +params['startStopId'],
        endStopId: +params['endStopId'],
        departureTime: params['departureTime'] || null
      };
      this.loadTimetable(request);
    });
  }

  loadTimetable(request: TimetableRequest): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.tripService.searchTimetable(request).subscribe({
      next: (res) => {
        this.results = res || [];
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error loading timetable.';
        this.isLoading = false;
      }
    });
  }
}
