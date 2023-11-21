import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionSummaryInfoComponent } from './position-summary-info.component';

describe('PositionSummaryInfoComponent', () => {
  let component: PositionSummaryInfoComponent;
  let fixture: ComponentFixture<PositionSummaryInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PositionSummaryInfoComponent]
    });
    fixture = TestBed.createComponent(PositionSummaryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
