import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { HolidayService } from '../../../shared/services/holiday.service';
import { Holiday } from '../../../shared/models/holiday.model';

@Component({
  selector: 'app-holiday-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  providers: [HolidayService],
  templateUrl: './holiday-list.component.html'
})
export class HolidayListComponent {
  holidays: Holiday[] = [];
  maxId: number = 0;
  displayedColumns: string[] = ['name', 'date', 'endDate', 'isSchoolHoliday', 'actions'];

  constructor(private holidayService: HolidayService) {}

  ngOnInit(): void {
    this.holidayService.getAll().subscribe((holidays) => {
      this.holidays = holidays || [];
    });
  }

  deleteHoliday(id: number): void {
    this.holidayService.delete(id).subscribe(() => {
      this.holidays = this.holidays.filter((holiday) => holiday.id !== id);
    });
  }
}
