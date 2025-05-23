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
import { Sede } from '../../services/sedes.service';

@Component({
  selector: 'app-sede-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sede-form.component.html',
})
export class SedeFormComponent implements OnInit {
  private fb = inject(FormBuilder);

  @Input() sedeToEdit: Sede | null = null;
  @Output() onSave = new EventEmitter<Partial<Sede>>();
  @Output() onCancel = new EventEmitter<void>();

  form = this.fb.group({
    nombre: ['', Validators.required],
    direccion: ['', Validators.required],
    telefono: [''],
    ciudad: [''],
    departamento: [''],
  });

  ngOnInit() {
    if (this.sedeToEdit) {
      this.form.patchValue(this.sedeToEdit);
    }
  }

  submitForm() {
    if (this.form.valid) {
      const values = Object.fromEntries(
        Object.entries(this.form.value).map(([k, v]) => [k, v ?? undefined])
      );
      this.onSave.emit(values);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
