import { TestBed } from '@angular/core/testing';

import { TimeSeriesAnalysisService } from './time-series-analysis.service';

describe('TimeSeriesAnalysisService', () => {
  let service: TimeSeriesAnalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeSeriesAnalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
