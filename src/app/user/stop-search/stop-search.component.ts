import { Component, EventEmitter } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { StopService } from '../../shared/services/stop.service';
import { Stop } from '../../shared/models/stop.model';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

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

  keyup = new EventEmitter<string>();

  search(): void {
    this.isSearching = true;
    this.errorMessage = '';
    this.stops = [];

    if (this.searchType === 'name') {
      return this.searchName();
    } else {
      return this.searchByCoordinates();
    }
  }

  searchName(): void {
    if (this.searchType !== 'name') return;

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
  }

  searchByCoordinates(): void {
    if (this.searchType !== 'coords') return;

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

  ngOnInit() {
    this.keyup.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(() => {
      this.search();
    });
  }
}
