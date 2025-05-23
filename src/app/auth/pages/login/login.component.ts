// src/app/auth/pages/login/login.component.ts
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loading = false;
  error: string | null = null;

  form = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  async onSubmit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.error = null;

    try {
      const { correo, password } = this.form.value;
      await this.authService.login(correo!, password!);
      this.router.navigate(['/']);
    } catch (err: any) {
      this.error = err.error?.msg || 'Error al iniciar sesión';
    } finally {
      this.loading = false;
    }
  }
}