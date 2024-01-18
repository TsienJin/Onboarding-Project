import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextFieldComponent } from './context-field.component';

describe('ContextFieldComponent', () => {
  let component: ContextFieldComponent;
  let fixture: ComponentFixture<ContextFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContextFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContextFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
