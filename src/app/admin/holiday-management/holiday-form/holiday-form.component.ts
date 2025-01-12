import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Holiday } from '../../../shared/models/holiday.model';
import { HolidayService } from '../../../shared/services/holiday.service';

@Component({
  selector: 'app-holiday-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule
  ],
  templateUrl: './holiday-form.component.html',
  providers: [HolidayService]
})
export class HolidayFormComponent implements OnInit {
  holiday: Holiday = new Holiday();
  isEditMode: boolean = false;

  constructor(
    private holidayService: HolidayService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.holidayService.getById(+id).subscribe((holiday) => {
        if (holiday) this.holiday = holiday;
      });
    } else {
      this.holiday.isSchoolHoliday = false;
      this.getMaxId();
    }
  }

  getMaxId(): void {
    this.holidayService.getAll().subscribe((holidays) => {
      this.holiday.id = holidays.reduce((max, holiday) => (holiday.id! > max ? holiday.id! : max), 0) + 1;
    });
  }

  save(): void {
    if (this.isEditMode) {
      this.holidayService.update(this.holiday.id!, this.holiday).subscribe(() => {
        this.router.navigate(['/admin/holidays']);
      });
    } else {
      this.holidayService.save(this.holiday).subscribe(() => {
        this.router.navigate(['/admin/holidays']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/admin/holidays']);
  }
}
