import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfesionalesService, Profesional } from '../../services/profesionales.service';
import { ProfesionalFormComponent } from '../../components/profesional-form/profesional-form.component';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'app-profesionales',
  standalone: true,
  imports: [CommonModule, ProfesionalFormComponent],
  templateUrl: './profesionales.component.html',
})
export class ProfesionalesComponent implements OnInit {
  private profesionalesService = inject(ProfesionalesService);

  profesionales: Profesional[] = [];
  loading = false;
  modalAbierto = false;
  profesionalEditando: Profesional | null = null;

  ngOnInit(): void {
    this.cargarProfesionales();
  }

  cargarProfesionales() {
    this.loading = true;
    this.profesionalesService.getProfesionales().subscribe({
      next: (data) => {
        this.profesionales = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar profesionales:', err);
        this.loading = false;
      },
    });
  }

  abrirModalCrear() {
    this.profesionalEditando = null;
    this.modalAbierto = true;
  }

  abrirModalEditar(pro: Profesional) {
    this.profesionalEditando = pro;
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
  }

  guardarProfesional(data: Partial<Profesional>) {
    if (this.profesionalEditando) {
      this.profesionalesService.update(this.profesionalEditando.uid, data).subscribe({
        next: (actualizado) => {
          const i = this.profesionales.findIndex((p) => p.uid === actualizado.uid);
          if (i >= 0) this.profesionales[i] = actualizado;
          this.profesionales = [...this.profesionales];
          this.cerrarModal();
        },
        error: (err) => {
          Notify.failure(`${err.error?.msg || 'Error al actualizar profesional'}`);
        },
        complete: () => this.cargarProfesionales(),
      });
    } else {
      const nuevoProfesional = {
        ...data,
        rol: 'PROFESIONAL',
        estado: true,
      };
      this.profesionalesService.create(nuevoProfesional).subscribe({
        next: (nuevo) => {
          this.profesionales.push(nuevo);
          this.cerrarModal();
        },
        error: (err) => {
          Notify.failure(`${err.error?.msg || 'Error al crear profesional'}`);
        },
        complete: () => this.cargarProfesionales(),
      });
    }
  }

  toggleEstado(p: Profesional) {
    this.profesionalesService.toggleEstado(p.uid).subscribe({
      next: () => {
        p.estado = !p.estado;
        this.profesionales = [...this.profesionales];
      },
      error: () => Notify.failure('Error al cambiar estado del profesional.'),
    });
  }
}
