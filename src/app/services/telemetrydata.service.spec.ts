import { TestBed } from '@angular/core/testing';

import { TelemetrydataService } from './telemetrydata.service';

describe('TelemetrydataService', () => {
  let service: TelemetrydataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TelemetrydataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
