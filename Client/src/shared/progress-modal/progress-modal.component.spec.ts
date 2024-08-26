import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressModalComponent } from './progress-modal.component';

describe('ProgressModalComponent', () => {
  let component: ProgressModalComponent;
  let fixture: ComponentFixture<ProgressModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgressModalComponent]
    });
    fixture = TestBed.createComponent(ProgressModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
