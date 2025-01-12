import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteStopsComponent } from './route-stops.component';

describe('RouteStopsComponent', () => {
  let component: RouteStopsComponent;
  let fixture: ComponentFixture<RouteStopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteStopsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteStopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
