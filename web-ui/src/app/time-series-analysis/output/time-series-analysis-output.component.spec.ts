import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSeriesAnalysisOutputComponent } from './time-series-analysis-output.component';

describe('TimeSeriesAnalysisOutputComponent', () => {
  let component: TimeSeriesAnalysisOutputComponent;
  let fixture: ComponentFixture<TimeSeriesAnalysisOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeSeriesAnalysisOutputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSeriesAnalysisOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
