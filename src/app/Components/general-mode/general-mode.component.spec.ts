import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralModeComponent } from './general-mode.component';

describe('GeneralModeComponent', () => {
  let component: GeneralModeComponent;
  let fixture: ComponentFixture<GeneralModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralModeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
