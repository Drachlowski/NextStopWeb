import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouteService } from '../../../shared/services/route.service';
import { Route as RouteModel } from '../../../shared/models/route.model';

@Component({
  selector: 'app-route-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  providers: [RouteService],
  templateUrl: './route-list.component.html'
})
export class RouteListComponent {
  routes: RouteModel[] = [];
  displayedColumns: string[] = ['routeName', 'validityStartDate', 'validityEndDate', 'daysOfOperation', 'actions'];

  constructor(private routeService: RouteService) {}

  ngOnInit(): void {
    this.routeService.getAll().subscribe((res) => {
      this.routes = res || [];
    });
  }

  deleteRoute(id?: number): void {
    if (!id) return;
    this.routeService.delete(id).subscribe(() => {
      this.routes = this.routes.filter(r => r.id !== id);
    });
  }
}
