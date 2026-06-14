import { Routes } from '@angular/router';
import { App } from './app';
import { ReproducaoFlorList } from "./reproducao-flor-list/components/reproducao-flor-list"
import { Home } from './home/components/home';
import { OrquidarioListComponent } from './orqudario-list/components/orquidario-list';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'reproducaoFlor', component:ReproducaoFlorList},
    {path: 'orquidario', component: OrquidarioListComponent}
];
