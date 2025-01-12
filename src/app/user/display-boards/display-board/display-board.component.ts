import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TripService } from '../../../shared/services/trip.service';
import { Trip } from '../../../shared/models/trip.model';
import { RouteService } from '../../../shared/services/route.service';
import { Route } from '../../../shared/models/route.model';
import { NextDeparture } from '../../../shared/models/next-departure.model';
import { Stop } from '../../../shared/models/stop.model';
import { StopService } from '../../../shared/services/stop.service';

@Component({
  selector: 'app-display-board',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './display-board.component.html'
})
export class DisplayBoardComponent implements OnInit {
  displayedColumns: string[] = ['route', 'departure', 'delay'];
  departures: NextDeparture[] = [];
  routes: Route[] = [];
  stopId = new FormControl<number | null>(null);
  limit = new FormControl<number | null>(5);
  currentDateTime = new FormControl<string | null>(null);
  errorMessage = '';
  stops: Stop[] = [];

  constructor(private tripService: TripService, private routeService: RouteService, private stopService: StopService) {}

  ngOnInit(): void {
    this.routeService.getAll().subscribe((routes) => {
      this.routes = routes || [];
    });

    this.stopService.getAll().subscribe((stops) => {
      this.stops = stops || [];
    });
  }

  loadTrips(): void {
    if (!this.stopId.value) {
      this.errorMessage = 'Stop ID is required!';
      return;
    }
    this.errorMessage = '';

    const limit = this.limit.value || 5;
    const currentDate = this.currentDateTime.value ?? (Date.now()).toString();

    this.tripService
      .getNextDepartures(this.stopId.value!, limit, currentDate)
      .subscribe({
        next: (data) => {
          this.departures = data || [];
        },
        error: (err) => {
          this.errorMessage = 'Failed to load trips. Please try again.';
          console.error(err);
        },
      });
  }

  getStopName(stopId: number): string {
    const foundStop = this.stops.find(s => s.id === stopId);
    return foundStop ? foundStop.name ?? '' : '';
  }

  getRouteName(routeId: number): string {
    const route = this.routes.find((r) => r.id === routeId);
    return route?.routeName ?? '';
  }
}
