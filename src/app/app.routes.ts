import { Routes } from '@angular/router';
import { App } from './app';
import { ReproducaoFlorList } from "./reproducao-flor-list/components/reproducao-flor-list"
import { Home } from './home/components/home';
import { ReproducaoFlorCreate } from './reproducao-flor-create/reproducao-flor-create';
import { LoginComponent } from './login-component/login-component';
import { AccessDeniedComponent } from './utils/acesso-negado-component';
import { adminGuard, authGuard } from './auth/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: Home},
    { path: 'reproducaoFlor', component:ReproducaoFlorList, canActivate:[authGuard, adminGuard]  },
    { path: 'reproducaoFlor/criar', component:ReproducaoFlorCreate, canActivate:[authGuard, adminGuard]  },
    { path: 'reproducaoFlor/editar/:id', component:ReproducaoFlorCreate, canActivate:[authGuard, adminGuard] },
    { path: 'access-denied', component: AccessDeniedComponent },
];
