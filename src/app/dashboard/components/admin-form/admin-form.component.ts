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
import { Administrativo } from '../../services/administrativos.service';

@Component({
  selector: 'app-admin-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-form.component.html',
})
export class AdminFormComponent implements OnInit {
  private fb = inject(FormBuilder);

  @Input() adminToEdit: Administrativo | null = null;
  @Output() onSave = new EventEmitter<Partial<Administrativo>>();
  @Output() onCancel = new EventEmitter<void>();

  form = this.fb.group({
    nombre: ['', Validators.required],
    cedula: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    telefono: [''],
    rol: ['ADMINISTRATIVO'],
    direccion: [''],
    cargo: [''],
  });

  ngOnInit() {
    if (this.adminToEdit) {
      this.form.patchValue(this.adminToEdit);
    }
  }

submitForm() {
  if (this.form.valid) {
    const limpio: Partial<Administrativo> = Object.fromEntries(
      Object.entries(this.form.value).map(([key, value]) => [key, value ?? undefined])
    );
    this.onSave.emit(limpio);
  } else {
    this.form.markAllAsTouched();
  }
}
}
