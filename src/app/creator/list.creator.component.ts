import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ILista } from '../structures/lista';
import { ListService } from '../services/list.services';
import { firebaseError } from '../services/firebase-error';

@Component({
    selector: 'creator',
    templateUrl: './list.creator.component.html'
})
export class ListCreatorComponent {
    list: ILista = { title: '' };
    busy = false;
    error = '';

    constructor(
        private listS: ListService,
        private router: Router,
        private ngZone: NgZone
    ) {}

    save(): void {
        if (this.busy) { return; }
        this.busy = true;
        this.error = '';
        this.listS.add(this.list)
            .then(list => {
                this.ngZone.run(() => {
                    this.router.navigate(['/lists', list.id]);
                });
            })
            .then(() => {
                this.ngZone.run(() => { this.busy = false; });
            })
            .catch(error => {
                this.ngZone.run(() => {
                    this.busy = false;
                    this.error = firebaseError(error);
                });
            });
    }
}
