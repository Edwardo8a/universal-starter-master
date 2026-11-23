import { Component, OnInit } from '@angular/core';
import { IRegister } from '../structures/registers';

@Component({
    selector: 'registro',
    templateUrl: 'registro.component.html',
    })

export class RegistroComponent implements OnInit {

    public register: IRegister = {name: '', email: '', password: ''};

    ngOnInit() : void {

    }
    save(){
        console.log(this.register);
    }
}
