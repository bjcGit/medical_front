import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { EstadisticaComponent } from "../../components/estadistica/estadistica.component";

@Component({
  selector: 'app-home',
  imports: [EstadisticaComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent { }
