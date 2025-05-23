import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Cita } from '../../services/citas.service';

@Component({
  selector: 'app-cita-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cita-form.component.html',
})
export class CitaFormComponent implements OnInit {
  private fb = inject(FormBuilder);

  @Input() citaToEdit: Cita | null = null;
  @Input() pacientes: any[] = [];
  @Input() profesionales: any[] = [];
  @Input() sedes: any[] = [];

  @Output() onSave = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<void>();

  form = this.fb.group({
    paciente_uid: ['', Validators.required],
    profesional_uid: ['', Validators.required],
    sede_uid: ['', Validators.required],
    fecha_hora: ['', Validators.required],
    motivo: ['', Validators.required],
  });

  ngOnInit() {
    if (this.citaToEdit) {
      this.form.patchValue({
        paciente_uid: this.citaToEdit.paciente.uid,
        profesional_uid: this.citaToEdit.profesional.uid,
        sede_uid: this.citaToEdit.sede.uid,
        fecha_hora: this.citaToEdit.fecha_hora,
        motivo: this.citaToEdit.motivo,
      });
    }
  }

  submitForm() {
    if (this.form.valid) {
      this.onSave.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
