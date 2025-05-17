import { Component } from '@angular/core';
import { HistoriaCardComponent } from "../../../historias/components/historia-card/historia-card.component";

@Component({
  selector: 'app-home-page',
  imports: [HistoriaCardComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent { }
