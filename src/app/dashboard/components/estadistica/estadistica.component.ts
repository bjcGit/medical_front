import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadisticasService, EstadisticasResponse } from '../../services/estadisticas.service';

@Component({
  selector: 'app-estadistica',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estadistica.component.html',
})
export class EstadisticaComponent implements OnInit {
  private estadisticasService = inject(EstadisticasService);

  stats: EstadisticasResponse | null = null;

  ngOnInit(): void {
    this.estadisticasService.getEstadisticas().subscribe({
      next: (data) => (this.stats = data),
      error: (err) => console.error('Error cargando estadísticas', err),
    });
  }
}
