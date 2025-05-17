import { Component } from '@angular/core';
import { CitaCardComponent } from "../../../citas/components/cita-card/cita-card.component";

@Component({
  selector: 'app-cita-page',
  imports: [CitaCardComponent],
  templateUrl: './cita-page.component.html',
})
export class CitaPageComponent { }
