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
import { Profesional } from '../../services/profesionales.service';

@Component({
  selector: 'app-profesional-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profesional-form.component.html',
})
export class ProfesionalFormComponent implements OnInit {
  private fb = inject(FormBuilder);

  @Input() profesionalToEdit: Profesional | null = null;
  @Output() onSave = new EventEmitter<Partial<Profesional>>();
  @Output() onCancel = new EventEmitter<void>();

  form = this.fb.group({
    nombre: ['', Validators.required],
    cedula: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    password: ['', Validators.minLength(6)],
    telefono: [''],
    direccion: [''],
    especialidad: [''],
    registro_profesional: [''],
  });

  ngOnInit() {
    if (this.profesionalToEdit) {
      this.form.patchValue(this.profesionalToEdit);
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
