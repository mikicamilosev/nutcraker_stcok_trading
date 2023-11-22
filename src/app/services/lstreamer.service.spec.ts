import { TestBed } from '@angular/core/testing';

import { LstreamerService } from './lstreamer.service';

describe('LstreamerService', () => {
  let service: LstreamerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LstreamerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
