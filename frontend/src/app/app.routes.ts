import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {Error404Component} from "./error404/error404.component";
import {DrugAeComponent} from "./drug-ae/drug-ae.component";

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: 'Drug AE Pair | Login'
  },
  {
    path: 'drug-ae',
    component: DrugAeComponent,
    title: 'Drug AE'
  },
  {
    path: '**',
    component: Error404Component
  }
];
