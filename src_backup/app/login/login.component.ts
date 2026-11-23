import {Component, OnInit} from '@angular/core';
import {AuthService}from'../services/auth.services';

//Permite a la clase ejecutar como componente 
@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
})
//Declaracion de componente
export class LoginComponent implements OnInit {
    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.authService.getUser().subscribe(console.log);  
    }

    login(): void {
        this.authService.login().then(console.log);
    }
}
