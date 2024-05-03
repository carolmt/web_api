import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FifoModeComponent } from './fifo-mode.component';

describe('FifoModeComponent', () => {
  let component: FifoModeComponent;
  let fixture: ComponentFixture<FifoModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FifoModeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FifoModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
