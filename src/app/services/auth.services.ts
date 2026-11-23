import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';

import { Observable } from 'rxjs';
import {map, take, filter} from 'rxjs/operators';

import { IUser } from '../structures/users';
import {UserServices} from './user.services';
import 'firebase/auth';


@Injectable()
export class AuthService {
    constructor(private afAuth: AngularFireAuth, private userS: UserServices) { }

    getuser() : Observable <IUser> {
        return this.afAuth.authState.pipe(
            filter(user => !! user),
            take(1),
            map((user => user as IUser)));
    }

    login(): Promise<void> {
        return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
            .then((result) => {
                if (!result.user) {
                    throw new Error('No se recibió el usuario de Google.');
                }
                return this.userS.add({uid: result.user!.uid, email: result.user!.email})
                    .catch(err => {
                        console.warn('No se pudo sincronizar usuario en Firestore (continuando login):', err);
                    });
            });
    }
}
