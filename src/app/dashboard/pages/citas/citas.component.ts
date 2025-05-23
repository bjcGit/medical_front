import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitasService, Cita } from '../../services/citas.service';
import { PacientesService } from '../../services/pacientes.service';
import { ProfesionalesService } from '../../services/profesionales.service';
import { SedesService } from '../../services/sedes.service';
import { CitaFormComponent } from '../../components/cita-form/cita-form.component';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, CitaFormComponent],
  templateUrl: './citas.component.html',
})
export class CitasComponent implements OnInit {
  private citasService = inject(CitasService);
  private pacientesService = inject(PacientesService);
  private profesionalesService = inject(ProfesionalesService);
  private sedesService = inject(SedesService);

  citas: Cita[] = [];
  pacientes: any[] = [];
  profesionales: any[] = [];
  sedes: any[] = [];

  modalOpen = false;
  citaEditando: Cita | null = null;

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.citasService.getCitas().subscribe(res => (this.citas = res));
    this.pacientesService.getPacientes().subscribe(res => (this.pacientes = res));
    this.profesionalesService.getProfesionales().subscribe(res => (this.profesionales = res));
    this.sedesService.getAll().subscribe(res => (this.sedes = res));
  }

  abrirModal(cita: Cita | null = null) {
    this.citaEditando = cita;
    this.modalOpen = true;
  }

  cerrarModal() {
    this.modalOpen = false;
  }

  guardarCita(data: any) {
    const obs = this.citaEditando
      ? this.citasService.update(this.citaEditando.uid, data)
      : this.citasService.create(data);

    obs.subscribe(() => {
      this.loadData();
      this.cerrarModal();
    });
  }
}
