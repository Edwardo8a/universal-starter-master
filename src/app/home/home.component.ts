import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ListService } from '../services/list.services';
import { ILista } from '../structures/lista';
import { deadlineLabel } from '../structures/deadline-label';
import { firebaseError } from '../services/firebase-error';
import { animate, style, transition, trigger, query, stagger } from '@angular/animations';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    animations: [
        trigger('enterState', [
            transition('* => *', [
                query(':enter',[
                    style({ transform: 'translateX(-100%)', opacity: 0 }),
                    stagger(50,[animate(200,style({ transform: 'translateX(0)', opacity: 1 }))                        
                    ])
                ], { optional: true })
                ])
            ])
    ]
})

export class HomeComponent {
    lists !: Observable<ILista[]>;
    error = '';
    deadlineLabel = deadlineLabel;

    constructor(private listS: ListService) {
        this.load();
    }

    load(): void {
        this.error = '';
        this.lists = this.listS.lists.pipe(catchError(error => {
            this.error = firebaseError(error);
            return of([] as ILista[]);
        }));
    }
}
