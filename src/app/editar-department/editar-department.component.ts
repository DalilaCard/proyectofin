import { Component, Input, ViewChild } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { DepartmentsServiceService } from '../services/departments-service.service';// Servicio para manejar departamentos
import { FormsModule } from '@angular/forms';
import { Department } from '../data/departments'; // Interfaz de Department
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-department',
  imports: [HeaderComponent, FormsModule],
  templateUrl: './editar-department.component.html',
  styleUrl: './editar-department.component.css'
})
export class EditarDepartmentComponent {
  department: Department | null = null;
  departmentIdd: string | null;
  user: string = '';

  // Inyección del servicio en el constructor
  constructor(private departmentsService: DepartmentsServiceService, private route: ActivatedRoute, private router: Router) {
    this.departmentIdd = this.route.snapshot.queryParamMap.get('departmentId');
    if (this.departmentIdd != null) {
      this.datosAActualizar(+this.departmentIdd);
    }
  }

  @ViewChild(HeaderComponent) hijo!: HeaderComponent;

  modificarHijo() {
    // Accediendo a la variable del hijo
    this.user = this.hijo.actualizarVariable();
    console.log('Usuario', this.user);
  }

  ngOnInit(): void {
    console.log('Componente Departments cargado correctamente');
    this.departmentIdd = this.route.snapshot.queryParamMap.get('departmentId');
    if (this.departmentIdd != null) {
      this.datosAActualizar(+this.departmentIdd);
    }
  }

  listadoDepartments: any[] = [];
  
  departmentName_department: string = '';
  
  // Método para obtener los datos de un departamento y asignarlos a las variables
  datosAActualizar(departmentId: number): void {
    this.departmentsService.getDepartment(departmentId).subscribe(
      (data) => {
        this.department = data; // Asignamos los datos recibidos a la propiedad `department`
        console.info('Departamento cargado para actualizar:', data);
        this.departmentName_department= this.department.departmentName;
      },
      (error) => {
        console.error('Error al obtener el departamento:', error); // Manejo de errores
      }
    );
  }

  // Método para actualizar un departamento
  

  ActualizarDepartment() {
    this.modificarHijo()
    //||  this.user === ''
    if (this.departmentName_department === '' ||  this.user === '') {
      alert("Por favor, ingrese todos los campos.");
      return;
    }

    const departmentActualizado = {
      departmentName: this.departmentName_department,
      user: this.user
    };

    // Llamamos al servicio para actualizar el héroe
    if (this.departmentIdd != null) {



      this.departmentsService.putDepartment(+this.departmentIdd, departmentActualizado).subscribe(
        (data) => {
          console.info("Department actualizado:", data);
          alert("Department actualizado exitosamente");
          //this.CargarReviews(); // Recargar los héroes después de la actualización
        },
        (error) => {
          console.error("Error al actualizar el Department", error);
          alert("Hubo un error al actualizar el Department. Intente nuevamente.");
        }
      );
    }

  }
  
  
}
