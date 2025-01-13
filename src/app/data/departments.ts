export interface Department {
   // department_id?: number,// Es opcional porque es autoincremental
   // department_name: string, // Campo obligatorio
   departmentId?: number; // Coincide con el backend
  departmentName: string;
    user: string
}

export type Departments = Department[];