import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { StopService } from '../../shared/services/stop.service';
import { Stop } from '../../shared/models/stop.model';

@Component({
  selector: 'app-stop-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatListModule
  ],
  providers: [StopService],
  templateUrl: './stop-search.component.html'
})
export class StopSearchComponent {
  searchType: 'name' | 'coords' = 'name';

  nameSearchTerm = '';

  latitude?: number;
  longitude?: number;

  stops: Stop[] = [];

  isSearching = false;
  errorMessage = '';

  constructor(private stopService: StopService) {}

  search(): void {
    this.isSearching = true;
    this.errorMessage = '';
    this.stops = [];

    if (this.searchType === 'name') {
      this.stopService.search(this.nameSearchTerm).subscribe({
        next: (res) => {
          this.stops = res || [];
          this.isSearching = false;
        },
        error: (err) => {
          this.errorMessage = 'Error fetching stops by name.';
          this.isSearching = false;
        }
      });
    } else {
      if (this.latitude == null || this.longitude == null) {
        this.errorMessage = 'Please provide valid coordinates.';
        this.isSearching = false;
        return;
      }
      this.stopService.nearby(this.latitude, this.longitude).subscribe({
        next: (res) => {
          this.stops = res || [];
          this.isSearching = false;
        },
        error: (err) => {
          this.errorMessage = 'Error fetching stops by coordinates.';
          this.isSearching = false;
        }
      });
    }
  }
}
