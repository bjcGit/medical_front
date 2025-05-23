import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environment';

export interface Profesional {
  uid: string;
  nombre: string;
  cedula: string;
  correo: string;
  password: string;
  telefono?: string;
  direccion?: string;
  cargo?: string;
  especialidad?: string;
  registro_profesional?: string;
  estado: boolean;
  rol: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfesionalesService {
  private http = inject(HttpClient);
  private baseUrlR = `${environment.apiUrl}/auth/register`;
  private baseUrl = `${environment.apiUrl}/usuarios`;

  getProfesionales(): Observable<Profesional[]> {
    return this.http.get<any>(this.baseUrl).pipe(
      map((response) => {
        const usuarios = response.data || response;
        return usuarios.filter((u: any) => u.rol?.toUpperCase() === 'PROFESIONAL');
      })
    );
  }

  create(data: Partial<Profesional>) {
    return this.http.post<Profesional>(this.baseUrlR, data);
  }

  update(uid: string, data: Partial<Profesional>) {
    return this.http.patch<Profesional>(`${this.baseUrl}/${uid}`, data);
  }

  toggleEstado(uid: string) {
    return this.http.patch(`${this.baseUrl}/desactivar/${uid}`, {});
  }
}
