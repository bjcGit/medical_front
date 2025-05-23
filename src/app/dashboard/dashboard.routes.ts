import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { HomeLayoutComponent } from "./layouts/home-layout/home-layout.component";
import { SedesComponent } from "./pages/sedes/sedes.component";
import { ProfesionalesComponent } from "./pages/profesionales/profesionales.component";
import { CitasComponent } from "./pages/citas/citas.component";
import { AdministrativosComponent } from "./pages/administrativos/administrativos.component";
import { authGuard } from "../auth/guards/auth.guard";
import { PacientesComponent } from "./pages/pacientes/pacientes.component";
import { HistoriasClinicasComponent } from "./pages/historias-clinicas/historias-clinicas.component";
import { rolGuard } from "../auth/guards/role.guard";

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [authGuard], 
    children: [
      { path: '', component: HomeComponent },

      { path: 'sedes', component: SedesComponent, canActivate: [rolGuard], data: { roles: ['ADMINISTRATIVO'] } },

      { path: 'profesionales', component: ProfesionalesComponent, canActivate: [rolGuard], data: { roles: ['ADMINISTRATIVO', 'PROFESIONAL'] } },

      { path: 'citas', component: CitasComponent, canActivate: [rolGuard], data: { roles: ['ADMINISTRATIVO', 'PROFESIONAL', 'PACIENTE'] } },

      { path: 'administrativos', component: AdministrativosComponent, canActivate: [rolGuard], data: { roles: ['ADMINISTRATIVO'] } },

      { path: 'pacientes', component: PacientesComponent, canActivate: [rolGuard], data: { roles: ['ADMINISTRATIVO', 'PROFESIONAL'] } },

      { path: 'historias', component: HistoriasClinicasComponent, canActivate: [rolGuard], data: { roles: ['ADMINISTRATIVO', 'PROFESIONAL'] } },

      { path: '**', pathMatch: 'full', redirectTo: '' }
    ],
  },
]

export default dashboardRoutes;