import { Routes } from '@angular/router';
import { App } from './app';
import { ReproducaoFlorList } from "./pages/reproducao-flor-list/components/reproducao-flor-list"
import { Home } from './pages/home/components/home';
import { ReproducaoFlorCreate } from './pages/reproducao-flor-create/reproducao-flor-create';
import { LoginComponent } from './pages/login-component/login-component';
import { AccessDeniedComponent } from './utils/acesso-negado-component';
import { adminGuard, authGuard } from './pages/auth/auth.guard';
import { RegisterComponent } from './pages/register-component/register-component';
import { UsersListComponent } from './pages/admin-component/user-list.component';
import { OrquidarioListComponent } from './pages/orquidario-list/components/orquidario-list';
import { OrquidarioForm } from './pages/orquidario-form/orquidario-form';
import { OrquidarioReproducoesComponent } from './pages/orquidario-reproducoes/orquidario-reproducoes';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: Home},
    { path: 'home', component: Home},
    { path: 'reproducaoFlor', component:ReproducaoFlorList, canActivate:[authGuard]  },
    { path: 'reproducaoFlor/criar', component:ReproducaoFlorCreate, canActivate:[authGuard]  },
    { path: 'reproducaoFlor/editar/:id', component:ReproducaoFlorCreate, canActivate:[authGuard] },
    { path: 'access-denied', component: AccessDeniedComponent },
    { path: 'register', component: RegisterComponent},
    { path: 'admin', component: UsersListComponent, canActivate: [authGuard, adminGuard] },
    { path: 'orquidario', component: OrquidarioListComponent, canActivate: [authGuard]},
    { path: 'orquidario/criar', component: OrquidarioForm, canActivate: [authGuard]},
    { path: 'orquidario/criar/:id', component: OrquidarioForm},
    { path: 'orquidario/reproducoes/:id', component: OrquidarioReproducoesComponent}
];
