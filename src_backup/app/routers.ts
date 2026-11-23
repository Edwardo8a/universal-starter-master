import { HomeComponent } from "./home/home.component";
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {TaskComponent} from './task/task.component';
import { AuthGuardService } from "./guards/auth.guard.services";
import { CanActivate } from "@angular/router/src/utils/preactivation";

export const router = [
  { path: '', component: HomeComponent, pathMatch: 'full', CanActivate:{} },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tarea', component: TaskComponent },
  { path: 'task', component: TaskComponent }
];