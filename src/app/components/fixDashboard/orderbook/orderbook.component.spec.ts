import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderbookComponent } from './orderbook.component';

describe('OrderbookComponent', () => {
  let component: OrderbookComponent;
  let fixture: ComponentFixture<OrderbookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderbookComponent]
    });
    fixture = TestBed.createComponent(OrderbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
