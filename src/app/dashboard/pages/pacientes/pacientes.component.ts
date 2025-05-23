import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacientesService, Paciente } from '../../services/pacientes.service';
import { PacienteFormComponent } from '../../components/paciente-form/paciente-form.component';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule, PacienteFormComponent],
  templateUrl: './pacientes.component.html',
})
export class PacientesComponent implements OnInit {
  private pacientesService = inject(PacientesService);

  pacientes: Paciente[] = [];
  loading = false;
  pacienteModalOpen = false;
  pacienteEditando: Paciente | null = null;

  ngOnInit(): void {
    this.cargarPacientes();
  }

  cargarPacientes() {
    this.loading = true;
    this.pacientesService.getPacientes().subscribe({
      next: (data) => {
        this.pacientes = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar pacientes:', err);
        this.loading = false;
      },
    });
  }

  abrirModalCrear() {
    this.pacienteEditando = null;
    this.pacienteModalOpen = true;
  }

  abrirModalEditar(paciente: Paciente) {
    this.pacienteEditando = paciente;
    this.pacienteModalOpen = true;
  }

  cerrarModal() {
    this.pacienteModalOpen = false;
  }

  guardarPaciente(data: Partial<Paciente>) {
    if (this.pacienteEditando) {
      this.pacientesService.update(this.pacienteEditando.uid, data).subscribe({
        next: (actualizado) => {
          const i = this.pacientes.findIndex((p) => p.uid === actualizado.uid);
          if (i >= 0) {
            this.pacientes[i] = actualizado;
            this.pacientes = [...this.pacientes];
          }
          this.cerrarModal();
        },
        error: (err) => {
          Notify.failure(`${err.error.msg || 'Error al actualizar paciente'}`);
        },
        complete: () => {
          this.cargarPacientes()
        },
      });
    } else {
      const nuevoPaciente = {
        ...data,
        rol: 'PACIENTE',
        estado: true,
      };
      this.pacientesService.create(nuevoPaciente).subscribe({
        next: (nuevo) => {
          this.pacientes.push(nuevo);
          this.cerrarModal();
        },
        error: (err) => {
          Notify.failure(`${err.error.msg || 'Error al crear paciente'}`);
        },
        complete: () => this.cargarPacientes(),
      });
    }
  }

  toggleEstado(p: Paciente) {
    this.pacientesService.toggleEstado(p.uid).subscribe({
      next: () => {
        p.estado = !p.estado;
        this.pacientes = [...this.pacientes];
      },
      error: (err) => {
        Notify.failure('Error al cambiar el estado del paciente.');
      },
    });
  }
}
