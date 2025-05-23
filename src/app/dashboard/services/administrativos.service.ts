import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environment';

export interface Administrativo {
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
export class AdministrativosService {
  private http = inject(HttpClient);
  private baseUrlR = `${environment.apiUrl}/auth/register`;
  private baseUrl = `${environment.apiUrl}/usuarios`;

  getAdministrativos(): Observable<Administrativo[]> {
    return this.http.get<any>(this.baseUrl).pipe(
      map((response) => {
        const usuarios = response.data || [];
        return usuarios.filter(
          (user: any) => user.rol?.toUpperCase() === 'ADMINISTRATIVO'
        );
      })
    );
  }

   create(data: Partial<Administrativo>): Observable<Administrativo> {
    return this.http.post<Administrativo>(this.baseUrlR, data);
  }

  update(uid: string, data: Partial<Administrativo>): Observable<Administrativo> {
    return this.http.patch<Administrativo>(`${this.baseUrl}/${uid}`, data);
  }

  toggleEstado(uid: string) {
    return this.http.patch(`${this.baseUrl}/desactivar/${uid}`, {});
  }
}
