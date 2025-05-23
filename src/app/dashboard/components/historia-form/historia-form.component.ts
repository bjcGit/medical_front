import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HistoriaClinica } from '../../services/historias.service';
import { ProfesionalesService } from '../../services/profesionales.service';
import { PacientesService } from '../../services/pacientes.service';

@Component({
  selector: 'app-historia-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './historia-form.component.html',
})
export class HistoriaFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private profesionalesService = inject(ProfesionalesService);
  private pacientesService = inject(PacientesService);

  @Input() historiaToEdit: HistoriaClinica | null = null;
  @Output() onSave = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<void>();

  form!: FormGroup;
  pacientes: any[] = [];
  profesionales: any[] = [];

  ngOnInit(): void {
    this.form = this.fb.group({
      profesional_uid: ['', Validators.required],
      paciente_uid: ['', Validators.required],
      fecha: ['', Validators.required],
      motivo_consulta: ['', Validators.required],
      antecedentes: [''],
      diagnostico: [''],
      tratamiento: [''],
    });

    if (this.historiaToEdit) {
      this.form.patchValue({
        profesional_uid: this.historiaToEdit.profesional.uid,
        paciente_uid: this.historiaToEdit.paciente.uid,
        fecha: this.historiaToEdit.fecha,
        motivo_consulta: this.historiaToEdit.motivo_consulta,
        antecedentes: this.historiaToEdit.antecedentes,
        diagnostico: this.historiaToEdit.diagnostico,
        tratamiento: this.historiaToEdit.tratamiento,
      });
    }

    this.cargarPacientesYProfesionales();
  }

  cargarPacientesYProfesionales() {
    this.pacientesService.getPacientes().subscribe({
      next: (data) => (this.pacientes = data),
    });

    this.profesionalesService.getProfesionales().subscribe({
      next: (data) => (this.profesionales = data),
    });
  }

  submitForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.onSave.emit(this.form.value);
  }
}
