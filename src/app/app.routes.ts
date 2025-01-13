import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DepartmentsListComponent } from './department-list/department-list.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreditosComponent } from './creditos/creditos.component';
import { NuevoDepartmentComponent } from './nuevo-department/nuevo-department.component';
import { EditarDepartmentComponent } from './editar-department/editar-department.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'Departments', component: DepartmentsListComponent, canActivate: [AuthGuard] }, // Ruta protegida
    { path: 'Dashboard', component: DashboardComponent },
    { path: 'Creditos', component: CreditosComponent },
    { path: 'NuevoDepartment', component: NuevoDepartmentComponent },
    { path: 'EditarDepartment', component: EditarDepartmentComponent },
    { path: '**', redirectTo: 'login' }
];