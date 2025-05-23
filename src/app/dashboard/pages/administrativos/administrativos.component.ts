import { Component, inject, OnInit } from '@angular/core';
import {
  Administrativo,
  AdministrativosService,
} from '../../services/administrativos.service';
import { CommonModule } from '@angular/common';
import { AdminFormComponent } from '../../components/admin-form/admin-form.component';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'app-administrativos',
  imports: [CommonModule, AdminFormComponent],
  templateUrl: './administrativos.component.html',
})
export class AdministrativosComponent implements OnInit {
  private administrativosService = inject(AdministrativosService);
  administrativos: Administrativo[] = [];
  loading = false;
  adminModalOpen = false;
  adminEditando: Administrativo | null = null;

  ngOnInit(): void {
    this.cargarAdministrativos();
  }

  abrirModalCrear() {
    this.adminEditando = null;
    this.adminModalOpen = true;
  }

  abrirModalEditar(admin: Administrativo) {
    this.adminEditando = admin;
    this.adminModalOpen = true;
  }

  cerrarModal() {
    this.adminModalOpen = false;
  }

  cargarAdministrativos() {
    this.loading = true;
    this.administrativosService.getAdministrativos().subscribe({
      next: (data) => {
        this.administrativos = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar administrativos:', err);
        this.loading = false;
      },
    });
  }

  guardarAdministrativo(data: Partial<Administrativo>) {
    if (this.adminEditando) {
      // Actualizar
      this.administrativosService
        .update(this.adminEditando.uid, data)
        .subscribe({
          next: (actualizado) => {
            const i = this.administrativos.findIndex(
              (a) => a.uid === actualizado.uid
            );
            if (i >= 0) this.administrativos[i] = actualizado;            
            this.cerrarModal();
          },
          error: (err) => {
            Notify.failure(`${err.error.msg}`);
            console.log('Error al actualizar:', err);
          },
          complete: () => {
            this.cargarAdministrativos()
          }
        });
    } else {
      // Crear
      const nuevoAdmin = {
        ...data,
        rol: 'ADMINISTRATIVO',
        estado: true,
      };
      this.administrativosService.create(nuevoAdmin).subscribe({
        next: (nuevo) => {
          this.administrativos.push(nuevo);
          this.cerrarModal();
          
        },
        error: (err) => {
          Notify.failure(`${err.error.msg}`);
          console.error('Error al crear:', err);
        },
        complete: () => {
          this.cargarAdministrativos()
        }
      });
    }
  }

  toggleEstado(admin: Administrativo) {
    this.administrativosService.toggleEstado(admin.uid).subscribe({
      next: () => {
        admin.estado = !admin.estado;
      },
      error: (err) => {
        console.error('Error al cambiar estado:', err);
        alert('No se pudo cambiar el estado del usuario.');
      },
    });
  }
}
