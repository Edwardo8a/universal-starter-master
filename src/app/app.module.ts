import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {AppComponent} from './base/app.component';
import {HomeComponent} from './home/home.component';
import {TransferHttpCacheModule} from '@nguniversal/common';

import { environment } from '../environments/environment';
import { routes } from './routers';
import { AngularFireModule } from 'angularfire2';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { AuthService } from './services/auth.services';
import { AuthGuards } from './guards/auth.guard.services';
import {UserServices} from './services/user.services';
import { ListCreatorComponent } from './creator/list.creator.component';
import { FormsModule } from '@angular/forms';
import {ListService} from './services/list.services';
import { ListComponent } from './creator/list/list.component';
import { TodoCreatorComponent } from './todo/creator/todos.creator.component';
import { TodoService } from './services/todos.services';
import {TodoCardComponent} from './todo/card/todo.card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    ListCreatorComponent,
    ListComponent,
    TodoCreatorComponent,
    TodoCardComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    RouterModule.forRoot(routes),
    TransferHttpCacheModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  providers: [AuthService, AuthGuards, UserServices, ListService, TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
