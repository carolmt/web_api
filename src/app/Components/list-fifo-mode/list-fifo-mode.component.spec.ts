import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFifoModeComponent } from './list-fifo-mode.component';

describe('ListFifoModeComponent', () => {
  let component: ListFifoModeComponent;
  let fixture: ComponentFixture<ListFifoModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListFifoModeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListFifoModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
