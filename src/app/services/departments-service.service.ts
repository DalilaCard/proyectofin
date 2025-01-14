import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department, Departments } from '../data/departments';



@Injectable({
  providedIn: 'root'
})
export class DepartmentsServiceService {


  urlApi = "https://pfinalp.onrender.com/api/v1/departments"
  private username = "admin"; // Reemplaza con tu usuario
  private password = "admin1234"; // Reemplaza con tu contraseña

  constructor(private httpCliente: HttpClient) { }



  private createAuthHeaders(): HttpHeaders {
    const auth = btoa(`${this.username}:${this.password}`);
    return new HttpHeaders({
      'Authorization': `Basic ${auth}`
    });
  }

  login(username: string, password: string): Observable<any> {
    return this.httpCliente.post(`${this.urlApi}/login`, { username, password }, {
      headers: this.createAuthHeaders()
    });
  }

  // GET
  getAllDepartments(): Observable<Departments> {
    return this.httpCliente.get<Departments>(this.urlApi, {
      headers: this.createAuthHeaders()
    });
  }

  // GET ID
  getDepartment(departmentId: number): Observable<Department> {
    return this.httpCliente.get<Department>(`${this.urlApi}/${departmentId}`, {
      headers: this.createAuthHeaders()
    });
  }

  // POST
  postDepartment(department: any): Observable<Department> {
    return this.httpCliente.post<Department>(this.urlApi, department, {
      headers: this.createAuthHeaders()
    });
  }

  // PUT
  putDepartment(departmentId: number, department: Department): Observable<Department> {
    return this.httpCliente.put<Department>(`${this.urlApi}/${departmentId}`, department, {
      headers: this.createAuthHeaders()
    });
  }



  // DELETE
  deleteDepartment(departmentId: number): Observable<Department> {
    return this.httpCliente.delete<Department>(`${this.urlApi}/${departmentId}`, {
      headers: this.createAuthHeaders()
    });
  }
}