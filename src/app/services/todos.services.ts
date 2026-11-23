import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ITodo, TStatus } from '../structures/todos';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable()
export class TodoService {
    constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {}
    private collection(uid: string, listId: string) {
        return this.afs.collection('users').doc(uid)
            .collection('list').doc(listId).collection<ITodo>('todos');
    }

    getFromlist(listId: string): Observable<ITodo[]> {
        return this.afAuth.authState.pipe(
            switchMap(user => user && listId
                ? this.collection(user.uid, listId).snapshotChanges().pipe(
                    map(actions => actions.map(item => ({
                        ...item.payload.doc.data() as ITodo,
                        id: item.payload.doc.id
                    })).filter(todo => todo.status === TStatus.Created))
                )
                : of([] as ITodo[]))
        );
    }

    add(listId: string, todo: ITodo): Promise<any> {
        const user = this.afAuth.auth.currentUser;
        if (!user || !listId) {
            return Promise.reject(new Error('Inicia sesión y selecciona una lista.'));
        }
        const content = (todo.content || '').trim();
        if (!content) {
            return Promise.reject(new Error('Escribe el pendiente.'));
        }
        return this.collection(user.uid, listId).add({
            content,
            description: todo.description || '',
            status: TStatus.Created,
            deadline: todo.deadline || null,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    }

    update(listId: string, todo: ITodo): Promise<void> {
        const user = this.afAuth.auth.currentUser;
        if (!user || !listId || !todo.id) {
            return Promise.reject(new Error('Inicia sesión y selecciona un pendiente válido.'));
        }
        const changes: any = { status: todo.status };
        if (todo.deadline !== undefined) { changes.deadline = todo.deadline; }
        return this.collection(user.uid, listId).doc(todo.id).update(changes);
    }
}
