import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { ILista } from '../structures/lista';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable()
export class ListService {
    public lists: Observable<ILista[]>;

    constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
        this.lists = this.afAuth.authState.pipe(
            switchMap(user => user
                ? this.collection(user.uid).snapshotChanges().pipe(
                    map(actions => actions.map(item => ({
                        ...item.payload.doc.data() as ILista,
                        id: item.payload.doc.id
                    })))
                )
                : of([] as ILista[]))
        );
    }

    private collection(uid: string) {
        return this.afs.collection('users').doc(uid).collection<ILista>('list');
    }

    add(list: ILista): Promise<any> {
        const user = this.afAuth.auth.currentUser;
        if (!user) {
            return Promise.reject(new Error('Inicia sesión antes de crear una lista.'));
        }
        const title = list.title.trim();
        if (!title) {
            return Promise.reject(new Error('Escribe el nombre de la lista.'));
        }
        return this.collection(user.uid).add({
            title,
            deadline: list.deadline || null,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    }
}
