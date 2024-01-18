import { Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {LoginComponent} from "./login/login.component";
import {IndexComponent} from "./index/index.component";
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
