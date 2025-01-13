import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DepartmentsServiceService } from '../services/departments-service.service';// Cambiar al servicio para departamentos
import { HeaderComponent } from "../header/header.component";
import { Department } from '../data/departments'; // Cambiar a la interfaz de departamentos
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-departments-list',
  imports: [FormsModule, HeaderComponent, RouterLink],
  templateUrl: './department-list.component.html', // Cambiar al archivo de plantilla correspondiente
  styleUrl: './department-list.component.css' // Cambiar al archivo de estilos correspondiente
})
export class DepartmentsListComponent {

  department: Department | null = null; // Cambiar `Review` a `Department`
  user: string = '';

  @ViewChild(HeaderComponent) hijo!: HeaderComponent;

  modificarHijo() {
    // Accediendo a la variable del hijo
    this.user = this.hijo.actualizarVariable();
    console.log('Usuario', this.user);
  }

  ngOnInit(): void {
    console.log('Componente DepartmentsList cargado correctamente');
    this.CargarDepartamentos();
  }

  listadoDepartamentos: any[] = [];
  departmentName_department: string = '';

  // Inyección del servicio en el constructor
  constructor(private departmentsService: DepartmentsServiceService, private router: Router) {
    this.CargarDepartamentos(); 
  }

  // Método para cargar los departamentos
  CargarDepartamentos() {
    this.departmentsService.getAllDepartments().subscribe(
      (data: any[]) => { // Asegúrate de que `data` sea un array de objetos
        // Filtra los departamentos según el usuario actual
        this.user = this.hijo.actualizarVariable();
        console.log('Usuario', this.user);
        this.listadoDepartamentos = data.filter(department => department.user === this.user);

        console.info('Departamentos cargados y filtrados:', this.listadoDepartamentos);
      },
      (error) => {
        console.error("Error al cargar los departamentos", error);
        this.listadoDepartamentos = []; // Limpiar en caso de error
      }
    );
  }

  // Método para eliminar un departamento
  EliminarDepartamento(departmentId: number) {
    this.departmentsService.deleteDepartment(departmentId).subscribe(
      () => {
        console.log(`Departamento con ID ${departmentId} eliminado correctamente.`);
        this.CargarDepartamentos(); // Recargar la lista de departamentos después de eliminar
      },
      (error) => {
        console.error("Error al eliminar el departamento", error);
      }
    );
  }

}
