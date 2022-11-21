import {Routes} from '@angular/router';

import {BaseComponent} from './components/base/base.component';
import {PageErrorComponent} from "./components/page-error/page-error.component";
import {PersonasComponent} from "./components/personas/personas.component";
import {MsalGuard} from "@azure/msal-angular";
import {PageAsignacionesComponent} from "./components/page-asignaciones/page-asignaciones.component";

export const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    // canActivate: [MsalGuard],
    children: [
      {
        path: 'pg-error',
        component: PageErrorComponent,
      },
      {
        path: 'personas',
        component: PersonasComponent,
      },
      {
        path: 'asignaciones',
        component: PageAsignacionesComponent,
      }
    ],
  },
  {
    path: '**',
    redirectTo: 'pg-error',
    pathMatch: 'full',
  },
];
