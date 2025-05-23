import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HistoriaClinica } from '../../services/historias.service';

@Component({
  selector: 'app-historia-clinica',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historia-clinica.component.html',
})
export class HistoriaClinicaComponent {
  @Input() historia!: HistoriaClinica;
   @Output() editarHistoria = new EventEmitter<HistoriaClinica>();

     onEditar() {
    this.editarHistoria.emit(this.historia);
  }
}