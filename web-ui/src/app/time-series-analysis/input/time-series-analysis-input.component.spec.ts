import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSeriesAnalysisInputComponent } from './time-series-analysis-input.component';

describe('TimeSeriesAnalysisInputComponent', () => {
  let component: TimeSeriesAnalysisInputComponent;
  let fixture: ComponentFixture<TimeSeriesAnalysisInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeSeriesAnalysisInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSeriesAnalysisInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
