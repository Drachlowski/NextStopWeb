import { TestBed } from '@angular/core/testing';

import { RouteStopService } from './routestop.service';

describe('RouteStopService', () => {
  let service: RouteStopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteStopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
