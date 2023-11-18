import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenameWatchlistNameComponent } from './rename-watchlist-name.component';

describe('RenameWatchlistNameComponent', () => {
  let component: RenameWatchlistNameComponent;
  let fixture: ComponentFixture<RenameWatchlistNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RenameWatchlistNameComponent]
    });
    fixture = TestBed.createComponent(RenameWatchlistNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
