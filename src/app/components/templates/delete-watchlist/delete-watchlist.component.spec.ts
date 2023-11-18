import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWatchlistComponent } from './delete-watchlist.component';

describe('DeleteWatchlistComponent', () => {
  let component: DeleteWatchlistComponent;
  let fixture: ComponentFixture<DeleteWatchlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteWatchlistComponent]
    });
    fixture = TestBed.createComponent(DeleteWatchlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
