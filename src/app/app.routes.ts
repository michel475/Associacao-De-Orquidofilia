import { Routes } from '@angular/router';
import { App } from './app';
import { ReproducaoFlorList } from "./reproducao-flor-list/components/reproducao-flor-list"
import { Home } from './home/components/home';
import { OrquidarioListComponent } from './orquidario-list/components/orquidario-list';
import { OrquidarioForm } from './orquidario-form/orquidario-form';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'reproducaoFlor', component:ReproducaoFlorList},
    {path: 'orquidario', component: OrquidarioListComponent},
    {path: 'orquidario/criar', component: OrquidarioForm}
];
