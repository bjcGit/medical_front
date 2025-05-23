import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environment';

export interface EstadisticasResponse {
  usuarios: {
    pacientes: number;
    profesionales: number;
    administrativos: number;
  };
  sedes: number;
  citas: {
    programadas: number;
    canceladas: number;
  };
  historias_clinicas: number;
}

@Injectable({ providedIn: 'root' })
export class EstadisticasService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/dashboard/resumen`;

  getEstadisticas(): Observable<EstadisticasResponse> {
    return this.http.get<any>(this.baseUrl).pipe(map(resp => resp.data));
  }
}
