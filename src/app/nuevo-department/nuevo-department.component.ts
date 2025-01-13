import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { DepartmentsListComponent } from '../department-list/department-list.component';
import { DepartmentsServiceService } from '../services/departments-service.service'; // Cambiar al servicio para departamentos
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nuevo-departamento',
  imports: [HeaderComponent, FormsModule],
  templateUrl: './nuevo-department.component.html',
  styleUrl: './nuevo-department.component.css'
})
export class NuevoDepartmentComponent {

  user: string = '';
  @ViewChild(HeaderComponent) hijo!: HeaderComponent;

  modificarHijo() {
    this.user = this.hijo.actualizarVariable();
    console.log('Usuario', this.user);
  }

  ngOnInit(): void {
    console.log('Componente NuevoDepartamento cargado correctamente');
    
  }

  listadoDepartamentos: any[] = [];
  
  departmentName_department: string = '';

   // Inyección del servicio en el constructor
   constructor(private departmentsService: DepartmentsServiceService, private router: Router) {
    this.CargarDepartamentos(); // Cargar los héroes al inicializar el componente
  }

  // Método para cargar los departamentos
  CargarDepartamentos() {
    this.departmentsService.getAllDepartments().subscribe(
      (data) => {
        this.listadoDepartamentos = data; // Asignamos los departamentos
        console.info('Departamentos cargados:', data);
        console.log('Departamentos en la variable departamentos:', this.listadoDepartamentos);
      },
      (error) => {
        console.error("Error al cargar los departamentos", error);
        this.listadoDepartamentos = []; // Limpiar en caso de error
      }
    );
  }

  // Método para crear un nuevo departamento
  CrearDepartamento() {
    if (this.departmentName_department === '') {
      alert("Por favor, ingrese el nombre del departamento.");
      return;
    }

    this.user = this.hijo.actualizarVariable();
    console.log('Usuario', this.user);
    const department = {
      departmentName: this.departmentName_department,
      user: this.user//aqui 
    };

    // Llamamos al servicio para crear el departamento
    this.departmentsService.postDepartment(department).subscribe(
      (data) => {
        console.info("Departamento creado:", data);
        alert("Departamento creado exitosamente");
        
      },
      (error) => {
        console.error("Error al crear el departamento", error);
        alert("Hubo un error al crear el departamento. Intente nuevamente.");
      }
    );
  }

  // Método para actualizar un departamento
  ActualizarDepartamento(id: number) {
    if (this.departmentName_department === '') {
      alert("Por favor, ingrese el nombre del departamento.");
      return;
    }

    const departamentoActualizado = {
      departmentName: this.departmentName_department,
      user: HeaderComponent.currentUser.username
    };

    // Llamamos al servicio para actualizar el departamento
    this.departmentsService.putDepartment(id, departamentoActualizado).subscribe(
      (data) => {
        console.info("Departamento actualizado:", data);
        alert("Departamento actualizado exitosamente");
        this.CargarDepartamentos(); // Recargar departamentos después de la actualización
      },
      (error) => {
        console.error("Error al actualizar el departamento", error);
        alert("Hubo un error al actualizar el departamento. Intente nuevamente.");
      }
    );
  }
}
