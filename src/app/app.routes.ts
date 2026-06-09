import { Routes } from '@angular/router';
import { App } from './app';
import { ReproducaoFlorList } from "./reproducao-flor-list/components/reproducao-flor-list"
import { Home } from './home/components/home';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'reproducaoFlor', component:ReproducaoFlorList},
];
