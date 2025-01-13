import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DepartmentsServiceService } from '../services/departments-service.service'; // Cambié el nombre del servicio para algo más intuitivo

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: DepartmentsServiceService, private router: Router) {
    // Inicialización del formulario reactivo
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin(): void {
    console.log('Formulario válido:', this.loginForm.valid);

    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.authService.login(username, password).subscribe({
        next: (response: any) => {
          console.log('Login exitoso:', response);

          // Guarda el estado del usuario o el token en localStorage
          localStorage.setItem('currentUser', JSON.stringify(response));

          // Redirige al usuario al dashboard
          this.router.navigate(['/Dashboard']).then(() => {
            console.log('Redirigido a Dashboard');
          });
        },
        error: (err) => {
          console.error('Error durante el inicio de sesión:', err);
          this.errorMessage = 'Credenciales inválidas. Por favor, intenta nuevamente.';
        },
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos del formulario.';
    }
  }

  onLogout(): void {
    // Limpia el localStorage eliminando la sesión actual
    localStorage.removeItem('currentUser');

    // Redirige a la página de login
    this.router.navigate(['/login']).then(() => {
      console.log('Redirigido a la página de login');
    });
  }

}
