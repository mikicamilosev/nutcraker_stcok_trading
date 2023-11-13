import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixdashboardComponent } from './fixdashboard.component';

describe('FixdashboardComponent', () => {
  let component: FixdashboardComponent;
  let fixture: ComponentFixture<FixdashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FixdashboardComponent]
    });
    fixture = TestBed.createComponent(FixdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
