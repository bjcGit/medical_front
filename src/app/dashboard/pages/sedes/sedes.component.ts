import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SedesService, Sede } from '../../services/sedes.service';
import { SedeFormComponent } from '../../components/sede-form/sede-form.component';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'app-sedes',
  standalone: true,
  imports: [CommonModule, SedeFormComponent],
  templateUrl: './sedes.component.html',
})
export class SedesComponent implements OnInit {
  private sedeService = inject(SedesService);

  sedes: Sede[] = [];
  loading = false;
  sedeModalOpen = false;
  sedeEditando: Sede | null = null;

  ngOnInit(): void {
    this.cargarSedes();
  }

  cargarSedes() {
    this.loading = true;
    this.sedeService.getAll().subscribe({
      next: (data) => {
        this.sedes = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar sedes:', err);
        this.loading = false;
      },
    });
  }

  abrirModalCrear() {
    this.sedeEditando = null;
    this.sedeModalOpen = true;
  }

  abrirModalEditar(sede: Sede) {
    this.sedeEditando = sede;
    this.sedeModalOpen = true;
  }

  cerrarModal() {
    this.sedeModalOpen = false;
  }

  guardarSede(data: Partial<Sede>) {
    if (this.sedeEditando) {
      this.sedeService.update(this.sedeEditando.uid, data).subscribe({
        next: (actualizada) => {
          const i = this.sedes.findIndex(s => s.uid === actualizada.uid);
          if (i >= 0) this.sedes[i] = actualizada;
          this.sedes = [...this.sedes];
          this.cerrarModal();
        },
        error: (err) => {
          Notify.failure(`${err.error?.msg || 'Error al actualizar sede'}`);
        },
        complete: () => this.cargarSedes(),
      });
    } else {
      this.sedeService.create(data).subscribe({
        next: (nueva) => {
          this.sedes.push(nueva);
          this.cerrarModal();
        },
        error: (err) => {
          Notify.failure(`${err.error?.msg || 'Error al crear sede'}`);
        },
        complete: () => this.cargarSedes(),
      });
    }
  }

  toggleEstado(sede: Sede) {
    this.sedeService.toggleEstado(sede.uid).subscribe({
      next: () => {
        sede.estado = !sede.estado;
        this.sedes = [...this.sedes];
      },
      error: () => Notify.failure('No se pudo cambiar el estado de la sede'),
    });
  }
}
