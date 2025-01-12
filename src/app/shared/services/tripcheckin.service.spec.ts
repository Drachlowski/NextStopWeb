import { TestBed } from '@angular/core/testing';

import { TripCheckInService } from './tripcheckin.service';

describe('TripCheckInService', () => {
  let service: TripCheckInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripCheckInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
