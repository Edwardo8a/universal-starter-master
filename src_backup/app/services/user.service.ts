import {Injectable} from '@angular/core';
import { User } from '../structure/user';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class UserService {
    private users: AngularFirestoreCollection<User>;
    constructor(private afs : AngularFirestore) {
        this.users = this.afs.collection<User>('users');
     }
        add(user:User) : Promise<void> {
        return this.users.doc(user.uid).set(user).catch(console.log);
    }   }