import {
  Component,
  inject,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Paciente } from '../../services/pacientes.service';

@Component({
  selector: 'app-paciente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './paciente-form.component.html',
})
export class PacienteFormComponent implements OnInit {
  private fb = inject(FormBuilder);

  @Input() pacienteToEdit: Paciente | null = null;
  @Output() onSave = new EventEmitter<Partial<Paciente>>();
  @Output() onCancel = new EventEmitter<void>();

  form = this.fb.group({
    nombre: ['', Validators.required],
    cedula: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    password: [''], // solo requerido al crear
    telefono: [''],
    direccion: [''],
    cargo: [''],
  });

  ngOnInit() {
    if (this.pacienteToEdit) {
      this.form.patchValue(this.pacienteToEdit);
      this.form.get('password')?.clearValidators(); // no obligatorio al editar
      this.form.get('password')?.updateValueAndValidity();
    }
  }

  submitForm() {
    if (this.form.valid) {
      const limpio = Object.fromEntries(
        Object.entries(this.form.value).map(([k, v]) => [k, v ?? undefined])
      );
      this.onSave.emit(limpio);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
