import { Component, Input, OnInit} from "@angular/core";
import { ITodo, TStatus } from "../../structures/todos";
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TodoService } from "../../services/todos.services";
import { firebaseError } from '../../services/firebase-error';
import { deadlineLabel } from '../../structures/deadline-label';

@Component({
    selector: 'todo-card',
    templateUrl: 'todo.card.component.html',
    animations: [
        trigger('statusAnimation',[
            state('0, void',style({
                transform: 'translateX(0px)',
                opacity: 1,
            })),
            state('1',style({
                transform: 'translateX(-100px)',
                opacity: 0,
            })),
            transition('0 <=> 1',[
                animate(200, style({transform: 'translateX(0)', opacity: 1})),
                animate(100)
            ])
        ]),

        trigger('pressAnimation',[
            state('up, void', style({
                transform: 'translateX(0px)'
            })),
            state('down', style({
                transform: 'translateX(-100px)'
            })),
            transition('up <=> down',[
                animate(100, style({transform: 'translateX(0)'})),
                animate(100)
            ])
        ])
    ]
})

export class TodoCardComponent implements OnInit{
    @Input() todo! : ITodo;
    @Input() listId!: string;
    public press: string = 'up';
    
    busy = false;
    error = '';
    constructor(private todoService: TodoService){}
    
    ngOnInit(): void{}
    deadlineLabel = deadlineLabel;

    completed(): void {
        if (this.busy) { return; }
        this.busy = true;
        this.error = '';
        this.press = 'up';
        this.todoService.update(this.listId, { ...this.todo, status: TStatus.Completed })
            .then(() => { this.busy = false; })
            .catch(error => {
                this.busy = false;
                this.error = firebaseError(error);
            });
    }
}
