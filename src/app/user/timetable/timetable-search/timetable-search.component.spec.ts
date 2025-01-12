import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableSearchComponent } from './timetable-search.component';

describe('TimetableSearchComponent', () => {
  let component: TimetableSearchComponent;
  let fixture: ComponentFixture<TimetableSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimetableSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimetableSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
