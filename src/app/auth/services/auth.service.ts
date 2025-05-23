import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError, map } from 'rxjs/operators';
import { lastValueFrom, of } from 'rxjs';
import { environment } from '../../../../environment';

interface LoginResponse {
  ok: boolean;
  data: {
    token: string;
    user: {
      uid: string;
      correo: string;
      nombre: string;
      rol: string;
    };
  };
  msg: string | null;
}

interface RevalidateResponse {
  ok: boolean;
  data: {
    ok: boolean;
    msg: string;
    user: {
      uid: string;
      correo: string;
      nombre: string;
      rol: string;
      cedula: string;
      telefono: string;
      direccion: string;
      sexo: string;
      fecha_nacimiento: string;
      especialidad: string;
      registro_profesional: string;
      cargo: string;
      eps: string;
      estado: boolean;
      isEstado: string;
      fecha_creacion: Date;
      fecha_modificacion: Date;
      sede: string;
    };
  };
  msg: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private baseUrl = environment.apiUrl;

  private _user: LoginResponse['data']['user'] | null = null;

  get user() {
    return this._user;
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }

  async login(correo: string, password: string) {
    const observable = this.http
      .post<LoginResponse>(`${this.baseUrl}/auth/login`, { correo, password })
      .pipe(
        tap((resp) => {
          if (resp.ok && resp.data.token) {
            localStorage.setItem('token', resp.data.token);
            this._user = resp.data.user;
          }
        }),
        map((resp) => resp) // Asegurar que el observable devuelva la respuesta completa
      );
    return await lastValueFrom(observable);
  }

  logout() {
    localStorage.removeItem('token');
    this._user = null;
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
  }

  // Método para verificar la autenticación al recargar
  async checkAuth(): Promise<boolean> {
    const token = this.token;
    if (!token) {
      this._user = null;
      return false;
    }

    try {
      const observable = this.http
        .get<RevalidateResponse>(`${this.baseUrl}/auth/revalidate`, {
          headers: this.getAuthHeaders(),
        })
        .pipe(
          tap((resp) => {
            if (resp.ok && resp.data.ok) {
              this._user = resp.data.user;
            }
          }),
          map((resp) => resp.data.user),
          catchError(() => {
            this._user = null;
            localStorage.removeItem('token');
            return of(false);
          })
        );
      const user = await lastValueFrom(observable);
      return !!user;
    } catch {
      this._user = null;
      localStorage.removeItem('token');
      return false;
    }
  }
}
