import { Routes } from '@angular/router';
import { App } from './app';
import { ReproducaoFlorList } from "./reproducao-flor-list/components/reproducao-flor-list"
import { Home } from './home/components/home';
import { ReproducaoFlorCreate } from './reproducao-flor-create/reproducao-flor-create';
import { LoginComponent } from './login-component/login-component';
import { AccessDeniedComponent } from './utils/acesso-negado-component';
import { adminGuard, authGuard } from './auth/auth.guard';
import { RegisterComponent } from './register-component/register-component';
import { UsersListComponent } from './admin-component/user-list.component';
import { OrquidarioListComponent } from './orquidario-list/components/orquidario-list';
import { OrquidarioForm } from './orquidario-form/orquidario-form';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: Home},
    { path: 'reproducaoFlor', component:ReproducaoFlorList, canActivate:[authGuard]  },
    { path: 'reproducaoFlor/criar', component:ReproducaoFlorCreate, canActivate:[authGuard]  },
    { path: 'reproducaoFlor/editar/:id', component:ReproducaoFlorCreate, canActivate:[authGuard] },
    { path: 'access-denied', component: AccessDeniedComponent },
    { path: 'register', component: RegisterComponent},
    { path: 'admin', component: UsersListComponent, canActivate: [authGuard, adminGuard] },
    {path: 'orquidario', component: OrquidarioListComponent, canActivate: [authGuard]},
    {path: 'orquidario/criar', component: OrquidarioForm, canActivate: [authGuard]},
];
