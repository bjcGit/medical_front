import { Routes } from "@angular/router";
import { StoreFrontLayoutComponent } from "./layouts/store-front-layout/store-front-layout.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { InfoDataComponent } from "./pages/info-data/info-data.component";
import { CitaPageComponent } from "./pages/cita-page/cita-page.component";
import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";
import { SedesPageComponent } from "./pages/sedes-page/sedes-page.component";
import { ProfesionalesPageComponent } from "./pages/profesionales-page/profesionales-page.component";

export const storeFrontRoutes: Routes =[
    {
        path: '',
        component: StoreFrontLayoutComponent,
        children: [
            {
                path: '',
                component: HomePageComponent
            },
            {
                path:'info/:data',
                component: InfoDataComponent
            },
            {
                path:'cita/:id',
                component: CitaPageComponent
            },
            {
                path:'sedes',
                component: SedesPageComponent
            },
            {
                path:'profesionales',
                component: ProfesionalesPageComponent
            },
            {
                path: '**',
                component: NotFoundPageComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];

export default storeFrontRoutes;