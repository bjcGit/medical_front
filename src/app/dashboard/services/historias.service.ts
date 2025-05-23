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

export interface HistoriaClinica {
  uid: string;
  fecha: string;
  motivo_consulta: string;
  antecedentes?: string;
  diagnostico?: string;
  tratamiento?: string;
  paciente: UsuarioLite;
  profesional: UsuarioLite;
  fecha_creacion: string;
  fecha_modificacion: string;
}

@Injectable({ providedIn: 'root' })
export class HistoriasService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/historias-clinicas`;

getHistorias(): Observable<HistoriaClinica[]> {
  return this.http.get<any>(this.baseUrl).pipe(
    map((response) => Array.isArray(response.data) ? response.data : [])
  );
}

  create(historia: any) {
    return this.http.post(this.baseUrl, historia);
  }

  update(uid: string, historia: any) {
    return this.http.patch(`${this.baseUrl}/${uid}`, historia);
  }
}
