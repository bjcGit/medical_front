import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { HomeLayoutComponent } from "./layouts/home-layout/home-layout.component";

export const dashboardRoutes: Routes = [
    {
        path: '',
        component: HomeLayoutComponent,
        children: [
            {
                path: '',
                component: HomeComponent
            }
        ]
            
    }
]

export default dashboardRoutes;