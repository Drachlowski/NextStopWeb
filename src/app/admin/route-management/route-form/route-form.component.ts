import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouteService } from '../../../shared/services/route.service';
import { Route as RouteModel } from '../../../shared/models/route.model';
import { RouteStopsComponent } from './route-stops/route-stops.component';


const ROUTES_URL = '/admin/routes'


@Component({
  selector: 'app-route-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    RouteStopsComponent,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  providers: [RouteService],
  templateUrl: './route-form.component.html'
})

export class RouteFormComponent implements OnInit {
  routeData: RouteModel = new RouteModel();
  isEditMode = false;

  constructor(
    private routeService: RouteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.routeService.getById(+idParam).subscribe((res) => {
        if (res) this.routeData = res;
      });
    } else {
      this.getMaxId();
    }
  }

  getMaxId(): void {
    this.routeService.getAll().subscribe((routes) => {
      this.routeData.id = routes.reduce((max, routes) => (routes.id! > max ? routes.id! : max), 0) + 1;
    });
  }

  save(): void {
    if (this.isEditMode && this.routeData.id) {
      this.routeService.update(this.routeData.id, this.routeData).subscribe(() => {
        this.router.navigate([ROUTES_URL]);
      });
    } else {
      this.routeService.save(this.routeData).subscribe(() => {
        this.router.navigate([ROUTES_URL]);
      });
    }
  }

  cancel(): void {
    this.router.navigate([ROUTES_URL]);
  }
}
