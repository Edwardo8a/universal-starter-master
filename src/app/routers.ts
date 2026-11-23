import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { AuthGuards } from './guards/auth.guard.services';
import { ListCreatorComponent } from './creator/list.creator.component';
import { ListComponent } from './creator/list/list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuards] },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'new', component: ListCreatorComponent, canActivate: [AuthGuards] },
  { path: 'lists/:id', component: ListComponent, canActivate: [AuthGuards] },
  { path: '**', redirectTo: '' }
];
