import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewwatchlistComponent } from './newwatchlist.component';

describe('NewwatchlistComponent', () => {
  let component: NewwatchlistComponent;
  let fixture: ComponentFixture<NewwatchlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewwatchlistComponent]
    });
    fixture = TestBed.createComponent(NewwatchlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
