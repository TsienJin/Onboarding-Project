import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugAeComponent } from './drug-ae.component';

describe('DrugAeComponent', () => {
  let component: DrugAeComponent;
  let fixture: ComponentFixture<DrugAeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrugAeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DrugAeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
