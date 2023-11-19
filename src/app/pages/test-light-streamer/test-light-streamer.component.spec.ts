import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestLightStreamerComponent } from './test-light-streamer.component';

describe('TestLightStreamerComponent', () => {
  let component: TestLightStreamerComponent;
  let fixture: ComponentFixture<TestLightStreamerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestLightStreamerComponent]
    });
    fixture = TestBed.createComponent(TestLightStreamerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
