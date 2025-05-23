import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment';
import { Observable, map } from 'rxjs';

export interface Paciente {
  uid: string;
  nombre: string;
  cedula: string;
  correo: string;
  password: string;
  telefono?: string;
  direccion?: string;
  cargo?: string;
  estado: boolean;
  rol: string;
}

@Injectable({
  providedIn: 'root',
})
export class PacientesService {
  private http = inject(HttpClient);
  private baseUrlR = `${environment.apiUrl}/auth/register`;
  private baseUrl = `${environment.apiUrl}/usuarios`;

  getPacientes(): Observable<Paciente[]> {
    return this.http.get<any>(this.baseUrl).pipe(
      map((response) => {
        const usuarios = response.data || [];
        return usuarios.filter((u: any) => u.rol?.toUpperCase() === 'PACIENTE');
      })
    );
  }

  create(data: Partial<Paciente>) {
    return this.http.post<Paciente>(this.baseUrlR, data);
  }

  update(uid: string, data: Partial<Paciente>) {
    return this.http.patch<Paciente>(`${this.baseUrl}/${uid}`, data);
  }

  toggleEstado(uid: string) {
    return this.http.patch(`${this.baseUrl}/desactivar/${uid}`, {});
  }
}
