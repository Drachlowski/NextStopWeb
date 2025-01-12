import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { StopService } from '../../../shared/services/stop.service';
import { Stop } from '../../../shared/models/stop.model';

@Component({
  selector: 'app-stop-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  providers: [StopService],
  templateUrl: './stop-list.component.html'
})
export class StopListComponent {
  stops: Stop[] = [];
  displayedColumns: string[] = ['name', 'shortName', 'latitude', 'longitude', 'actions'];

  constructor(private stopService: StopService) {}

  ngOnInit(): void {
    this.stopService.getAll().subscribe((stops) => {
      this.stops = stops || [];
    });
  }

  deleteStop(id?: number): void {
    if (!id) return;
    this.stopService.delete(id).subscribe(() => {
      this.stops = this.stops.filter((stop) => stop.id !== id);
    });
  }
}
