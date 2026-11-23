import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ListService } from '../services/list.services';
import { ILista } from '../structures/lista';
import { deadlineLabel } from '../structures/deadline-label';
import { firebaseError } from '../services/firebase-error';
import { animate, style, transition, trigger, query, stagger, state } from '@angular/animations';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    animations: [
        trigger('enterState', [
            transition('* => *', [
                query(':enter', [
                    style({ transform: 'translateX(-100%)', opacity: 0 }),
                    stagger(60, [animate(250, style({ transform: 'translateX(0)', opacity: 1 }))])
                ], { optional: true })
            ])
        ]),
        trigger('swipeDelete', [
            state('idle, void', style({
                transform: 'translateX(0px)',
                opacity: 1
            })),
            state('pressing', style({
                transform: 'translateX(-60px)',
                opacity: 0.8
            })),
            state('deleted', style({
                transform: 'translateX(-110%)',
                opacity: 0,
                height: 0,
                padding: 0,
                margin: 0
            })),
            transition('idle <=> pressing', animate('120ms ease')),
            transition('pressing => deleted', animate('220ms ease-in')),
            transition('idle => deleted', animate('220ms ease-in'))
        ])
    ]
})
export class HomeComponent {
    lists!: Observable<ILista[]>;
    error = '';
    deadlineLabel = deadlineLabel;

    // mapa: id de lista -> estado de swipe
    swipeState: { [id: string]: string } = {};

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

    press(id: string): void {
        this.swipeState[id] = 'pressing';
    }

    release(id: string): void {
        if (this.swipeState[id] === 'pressing') {
            this.swipeState[id] = 'idle';
        }
    }

    swipeLeft(list: ILista): void {
        if (!list.id || this.swipeState[list.id] === 'deleted') { return; }
        this.swipeState[list.id!] = 'deleted';
        setTimeout(() => {
            this.listS.delete(list.id!).catch(err => {
                this.swipeState[list.id!] = 'idle';
                this.error = firebaseError(err);
            });
        }, 230);
    }

    getSwipeState(id: string): string {
        return this.swipeState[id] || 'idle';
    }
}
