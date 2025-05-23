import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment';
import { map, Observable } from 'rxjs';

export interface Sede {
  uid: string;
  nombre: string;
  direccion: string;
  telefono?: string;
  ciudad?: string;
  departamento?: string;
  estado: boolean;
  fecha_creacion: string;
  fecha_modificacion?: string;
}

@Injectable({ providedIn: 'root' })
export class SedesService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/sedes`;

  getAll(): Observable<Sede[]> {
    return this.http
      .get<any>(this.baseUrl)
      .pipe(map((response) => response.data || []));
  }

  create(data: Partial<Sede>): Observable<Sede> {
    return this.http.post<Sede>(this.baseUrl, data);
  }

  update(uid: string, data: Partial<Sede>): Observable<Sede> {
    return this.http.patch<Sede>(`${this.baseUrl}/${uid}`, data);
  }

  toggleEstado(uid: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${uid}`, {});
  }
}
