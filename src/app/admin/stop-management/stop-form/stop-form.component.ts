import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { StopService } from '../../../shared/services/stop.service';
import { Stop } from '../../../shared/models/stop.model';

@Component({
  selector: 'app-stop-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [StopService],
  templateUrl: './stop-form.component.html'
})
export class StopFormComponent implements OnInit {
  stop: Stop = new Stop();
  isEditMode = false;

  constructor(
    private stopService: StopService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.stopService.getById(+id).subscribe((res) => {
        if (res) this.stop = res;
      });
    } else {
      this.getMaxId();
    }
  }
  getMaxId(): void {
    this.stopService.getAll().subscribe((stops) => {
      this.stop.id = stops.reduce((max, stop) => (stop.id! > max ? stop.id! : max), 0) + 1
    });
  }

  save(): void {
    if (this.isEditMode && this.stop.id) {
      this.stopService.update(this.stop.id, this.stop).subscribe(() => {
        this.router.navigate(['/admin/stops']);
      });
    } else {
      this.stopService.save(this.stop).subscribe(() => {
        this.router.navigate(['/admin/stops']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/admin/stops']);
  }
}
