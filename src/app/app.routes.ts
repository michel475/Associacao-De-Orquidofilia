import { Routes } from '@angular/router';
import { App } from './app';
import { ReproducaoFlorList } from "./reproducao-flor-list/components/reproducao-flor-list"
import { Home } from './home/components/home';
import { ReproducaoFlorCreate } from './reproducao-flor-create/reproducao-flor-create';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'reproducaoFlor', component:ReproducaoFlorList},
    {path: 'reproducaoFlor/criar', component:ReproducaoFlorCreate},
    {path: 'reproducaoFlor/editar/:id', component:ReproducaoFlorCreate},
];
