import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HistoriasService,
  HistoriaClinica,
} from '../../services/historias.service';
import { HistoriaClinicaComponent } from '../../components/historia-clinica/historia-clinica.component';
import { HistoriaFormComponent } from '../../components/historia-form/historia-form.component';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'app-historias-clinicas',
  standalone: true,
  imports: [CommonModule, HistoriaClinicaComponent, HistoriaFormComponent],
  templateUrl: './historias-clinicas.component.html',
})
export class HistoriasClinicasComponent implements OnInit {
  private historiasService = inject(HistoriasService);
  historias: HistoriaClinica[] = [];
  loading = false;
 modalAbierto = false;
 error: string | null = null;
  historiaEditando: HistoriaClinica | null = null;

  ngOnInit(): void {
    this.cargarHistorias();
  }

abrirModalCrear() {
  this.historiaEditando = null;
  this.modalAbierto = true;
}

abrirModalEditar(historia: HistoriaClinica) {
  this.historiaEditando = historia;
  this.modalAbierto = true;
}

cerrarModal() {
  this.modalAbierto = false;
}

  cargarHistorias() {
    this.loading = true;
    this.historiasService.getHistorias().subscribe({
      next: (data) => {       
        this.historias = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar historias clínicas:', err);
        this.loading = false;
      },
    });
  }
  guardarHistoria(data: any) {
  if (this.historiaEditando) {
    // Actualizar
    this.historiasService.update(this.historiaEditando.uid, data).subscribe({
      next: () => {
        this.cargarHistorias();
        this.cerrarModal();
      },
      error: (err) => {
        Notify.failure(`${err.error.msg}`);
        console.error('Error al actualizar historia:', err);
      },
      complete: () => this.cargarHistorias(),
    });
  } else {
    // Crear
    this.historiasService.create(data).subscribe({
      next: () => {
        this.cargarHistorias();
        this.cerrarModal();
      },
      error: (err) => {
        Notify.failure(`${err.error.msg}`);
        console.error('Error al crear historia:', err);
      },
       complete: () => this.cargarHistorias(),
    });
  }
}
}
