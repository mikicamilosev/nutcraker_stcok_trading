import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderEntryComponent } from './order-entry.component';

describe('OrderEntryComponent', () => {
  let component: OrderEntryComponent;
  let fixture: ComponentFixture<OrderEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderEntryComponent]
    });
    fixture = TestBed.createComponent(OrderEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
