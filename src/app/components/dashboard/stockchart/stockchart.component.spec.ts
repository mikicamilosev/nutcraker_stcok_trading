import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockchartComponent } from './stockchart.component';

describe('StockchartComponent', () => {
  let component: StockchartComponent;
  let fixture: ComponentFixture<StockchartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockchartComponent]
    });
    fixture = TestBed.createComponent(StockchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
