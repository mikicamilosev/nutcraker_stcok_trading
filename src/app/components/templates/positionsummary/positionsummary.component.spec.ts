import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionsummaryComponent } from './positionsummary.component';

describe('PositionsummaryComponent', () => {
  let component: PositionsummaryComponent;
  let fixture: ComponentFixture<PositionsummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PositionsummaryComponent]
    });
    fixture = TestBed.createComponent(PositionsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
