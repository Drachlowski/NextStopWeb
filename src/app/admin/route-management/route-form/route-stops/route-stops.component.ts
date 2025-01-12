import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { StopService } from '../../../../shared/services/stop.service';
import { RouteStopService } from '../../../../shared/services/routestop.service';
import { RouteStop } from '../../../../shared/models/routestop.model';
import { Stop } from '../../../../shared/models/stop.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-route-stops',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    MatCardModule
  ],
  providers: [RouteStopService, StopService],
  templateUrl: './route-stops.component.html'
})
export class RouteStopsComponent implements OnInit {
  @Input() routeId?: number;
  @Input() isEditMode = false;

  stops: Stop[] = [];
  routeStops: RouteStop[] = [];
  newStopId?: number;
  newStopSequence?: number;
  newDelay?: number;

  displayedColumns: string[] = ['stopName', 'stopSequence', 'delay', 'actions'];

  constructor(
    private routeStopService: RouteStopService,
    private stopService: StopService
  ) {}

  ngOnInit(): void {
    this.stopService.getAll().subscribe((res) => (this.stops = res || []));

    if (this.isEditMode && this.routeId) {
      this.loadRouteStops();
    }
  }

  getStopName(stopId: number): string {
    const foundStop = this.stops.find(s => s.id === stopId);
    return foundStop ? foundStop.name ?? '' : '';
  }


  loadRouteStops(): void {
    if (!this.routeId) return;
    this.routeStopService.getAll().subscribe((res) => {
      this.routeStops = (res || []).filter((rs) => rs.routeId === this.routeId);
    });
  }

  addStop(): void {
    if (!this.routeId || !this.newStopId || !this.newStopSequence) return;

    const routeStop: RouteStop = {
      id: 0,
      routeId: this.routeId,
      stopId: this.newStopId,
      stopSequence: this.newStopSequence,
      scheduled: this.newDelay || 0
    };

    this.routeStopService.save(routeStop).subscribe(() => {
      this.loadRouteStops();
      this.newStopId = undefined;
      this.newStopSequence = undefined;
      this.newDelay = undefined;
    });
  }

  deleteStop(routeStopId: number): void {
    this.routeStopService.delete(routeStopId).subscribe(() => {
      this.routeStops = this.routeStops.filter((rs) => rs.id !== routeStopId);
    });
  }
}
