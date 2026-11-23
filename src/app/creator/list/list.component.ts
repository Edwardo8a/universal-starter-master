import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ITodo } from '../../structures/todos';
import { TodoService } from '../../services/todos.services';
import { firebaseError } from '../../services/firebase-error';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

@Component({
    selector: 'list',
    templateUrl: 'list.component.html',
    animations: [
        trigger('enterState',[
            transition('*=>*',[
                query('todo-card:leave',[
                    animate('200ms ease', style({opacity:0, transform:'translateX(-100px)'}))
                ], {optional:true}),
                query('todo-card:enter',[
                    style({opacity:0, transform:'translateY(-100%)'}),
                    stagger(50,[animate('200ms ease',
                    style({opacity:1, transform:'translateY(0)'}))])
                ], {optional:true})
            ])
        ])
    ]
})

export class ListComponent implements OnInit {
    public listId !: string;
    public todos !: Observable<ITodo[]>;
    error = '';

    trackTodoObjects = (index: number, obj: ITodo): string => obj.id!;

    constructor(private route: ActivatedRoute, private todoS: TodoService) {}

    ngOnInit(): void { 
        this.listId = this.route.snapshot.params.id;
        this.todos = this.route.paramMap.pipe(switchMap(params => {
            this.listId = params.get('id')!;
            this.error = '';
            return this.todoS.getFromlist(this.listId).pipe(catchError(error => {
                this.error = firebaseError(error);
                return of([] as ITodo[]);
            }));
        }));
    }
}
