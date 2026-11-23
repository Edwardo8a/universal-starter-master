import { Component, Input } from '@angular/core';
import { ITodo, TStatus } from '../../structures/todos';
import { TodoService } from '../../services/todos.services';
import { firebaseError } from '../../services/firebase-error';

@Component({
    selector: 'todo-creator',
    templateUrl: 'todos.creator.component.html'
})

export class TodoCreatorComponent {
    @Input() id!: string ;
    public formState: string = 'collapsed';
    busy = false;
    error = '';
    todo: ITodo = { content: '', description: '', status: TStatus.Created };

    constructor(private todoS: TodoService) {}
    async save(): Promise<void> {
        if (this.busy) return;
        this.busy = true;
        this.error = '';
        try {
            await this.todoS.add(this.id, this.todo);
            this.todo = { content: '', description: '', status: TStatus.Created };
        } catch (error) {
            this.error = firebaseError(error);
        } finally {
            this.busy = false;
        }
    }
    toggleForm(){
        this.formState = (this.formState == 'collapsed') ? 'expanded' : 'collapsed';
    }
    label(){
        return (this.formState == 'collapsed') ? 'Agregar nuevo pendiente' : 'Ocultar formulario';
    }
    icon(){
        return (this.formState == 'collapsed') ? 'fa-plus' : 'fa-caret-up';
    }
}
