import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-home-layout',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './home-layout.component.html',
})
export class HomeLayoutComponent { }
