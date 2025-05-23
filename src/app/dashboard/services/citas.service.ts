import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environment';

export interface UsuarioLite {
  uid: string;
  nombre: string;
  cedula: string;
  correo: string;
}

export interface Sede {
  uid: string;
  nombre: string;
}

export interface Cita {
  uid: string;
  motivo: string;
  fecha_hora: string;
  estado: string;
  paciente: UsuarioLite;
  profesional: UsuarioLite;
  sede: Sede;
}

@Injectable({ providedIn: 'root' })
export class CitasService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/citas`;

  getCitas(): Observable<Cita[]> {
    return this.http.get<any>(this.baseUrl).pipe(
      map(res => res.data || [])
    );
  }

  create(data: any) {
    return this.http.post(this.baseUrl, data);
  }

  update(uid: string, data: any) {
    return this.http.patch(`${this.baseUrl}/${uid}`, data);
  }
}
