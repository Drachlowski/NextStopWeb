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
import { MatInputModule } from '@angular/material/input';
import { DoCheck, KeyValueDiffers, KeyValueDiffer } from '@angular/core';

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
    MatCardModule,
    MatInputModule
  ],
  providers: [RouteStopService, StopService],
  templateUrl: './route-stops.component.html'
})
export class RouteStopsComponent implements OnInit {
  routeId?: number;

  @Input()
  set routeIdInput(value: number) {
    if (value == null) return;
    this.routeId = value;
    this.loadStuff();
  }


  @Input() isEditMode = false;

  nextId: number = 0;

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

    console.log(this.routeId);
    if (this.isEditMode && this.routeId) {
      this.loadStuff();

    }
  }
  getStopName(stopId: number): string {
    const foundStop = this.stops.find(s => s.id === stopId);
    return foundStop ? foundStop.name ?? '' : '';
  }

  loadStuff(): void {
    this.loadStops();
    this.loadRouteStops();
  }

  loadStops(): void {
    this.stopService.getAll().subscribe((res) => (this.stops = res || []));
  }

  loadRouteStops(): void {
    if (!this.routeId) return;
    this.routeStopService.getAll().subscribe((routeStops) => {
      this.nextId = routeStops.reduce((max, routeStop) => (routeStop.id! > max ? routeStop.id! : max), 0) + 1;
      this.routeStops = (routeStops || [])
        .filter((rs) => rs.routeId === this.routeId)
        .sort((a, b) => a.stopSequence! - b.stopSequence!);
      console.log(this.routeStops);
    });
  }

  addStop(): void {
    if (!this.routeId || !this.newStopId || !this.newStopSequence) return;

    const routeStop: RouteStop = {
      id: this.nextId,
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

      this.loadStuff();
    });
  }

  deleteStop(routeStopId: number): void {
    this.routeStopService.delete(routeStopId).subscribe(() => {
      this.routeStops = this.routeStops.filter((rs) => rs.id !== routeStopId);
      this.loadStuff();
    });
  }
}
