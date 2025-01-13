import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoDepartmentComponent } from './nuevo-department.component';

describe('NuevoDepartmentComponent', () => {
  let component: NuevoDepartmentComponent;
  let fixture: ComponentFixture<NuevoDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoDepartmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
