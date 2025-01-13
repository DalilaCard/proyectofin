import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDepartmentComponent } from './editar-department.component';

describe('EditarDepartmentComponent', () => {
  let component: EditarDepartmentComponent;
  let fixture: ComponentFixture<EditarDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarDepartmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
